require 'rails_helper'
require 'devise/jwt/test_helpers'

describe 'Profile API' do
  let!(:user) { create(:user, :verified) }
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }
  let(:auth_headers) { Devise::JWT::TestHelpers.auth_headers(headers, user) }

  describe 'PUT /api/v1/profile' do
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      context 'with valid params' do
        it 'returns 204' do
          put '/api/v1/profile', params: { user: { name: 'Александр', personal_account: 'Das2WEsd12' } }.to_json, headers: auth_headers
          expect(response).to have_http_status(204)
        end

        it 'create new car' do
          expect { put '/api/v1/profile', params: { user: { name: 'Александр', cars_attributes: [build(:car, user: nil)] } }.to_json, headers: auth_headers }.to change(Car, :count).by(1)
        end

        it 'delete car' do
          user.update_attributes(name: 'Александр')
          create(:car, user: user)
          car_id = user.cars.take.id

          expect { put '/api/v1/profile', params: { user: { cars_attributes: [{ id: car_id, _destroy: 1 }] } }.to_json, headers: auth_headers }.to change(Car, :count).by(-1)
        end
      end

      context 'with invalid params' do
        before { put '/api/v1/profile', params: { user: { name: '', cars_attributes: [Car.new] } }.to_json, headers: auth_headers }

        it 'returns 422' do
          expect(response).to have_http_status(422)
        end

        it 'returns user error messages' do
          expect(json[:errors][:name]).to eq(['не может быть пустым'])
        end

        it 'returns car error messages' do
          expect(json[:errors][:'cars[0].brand']).to eq(['не может быть пустым'])
          expect(json[:errors][:'cars[0].model']).to eq(['не может быть пустым'])
          expect(json[:errors][:'cars[0].color']).to eq(['не может быть пустым'])
          expect(json[:errors][:'cars[0].number']).to eq(['не может быть пустым'])
        end
      end
    end

    def do_request(options = {})
      put '/api/v1/profile', options
    end
  end
end
