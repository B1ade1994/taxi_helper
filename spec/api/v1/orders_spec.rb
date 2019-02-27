require 'rails_helper'
require 'devise/jwt/test_helpers'

describe 'Orders API' do
  let!(:user) { create(:user, :verified) }
  let(:headers) { { 'Accept' => 'application/json', 'Content-Type' => 'application/json' } }
  let(:auth_headers) { Devise::JWT::TestHelpers.auth_headers(headers, user) }

  describe 'POST /api/v1/orders' do
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      context 'with valid params' do
        it 'returns 201' do
          post '/api/v1/orders', params: { order: attributes_for(:order) }.to_json, headers: auth_headers
          expect(response).to have_http_status(201)
        end
      end

      context 'with invalid params' do
        before { post '/api/v1/orders', params: { order: { client_phone_number: '' } }.to_json, headers: auth_headers }

        it 'returns 422' do
          expect(response).to have_http_status(422)
        end

        it 'returns order error messages' do
          error_messages_list(json)
        end
      end
    end

    def do_request(options = {})
      post '/api/v1/orders', options
    end
  end

  describe 'put /api/v1/orders/:id' do
    let!(:order) { create(:order, author: user) }
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      context 'with valid params' do
        it 'returns 204' do
          put "/api/v1/orders/#{order.id}", params: { order: { address_end: 'Севас' } }.to_json, headers: auth_headers
          expect(response).to have_http_status(204)
        end
      end

      context 'with invalid params' do
        before { post '/api/v1/orders', params: { order: { client_phone_number: '' } }.to_json, headers: auth_headers }

        it 'returns 422' do
          expect(response).to have_http_status(422)
        end

        it 'returns order error messages' do
          error_messages_list(json)
        end
      end
    end

    def do_request(options = {})
      put "/api/v1/orders/#{order.id}", options
    end
  end

  describe 'get /api/v1/orders' do
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      context 'with valid params' do
        before { create_list(:order, 3, author: user) }
        before { get '/api/v1/orders', headers: auth_headers }

        it 'returns 200' do
          expect(response).to have_http_status(200)
        end

        it 'returns orders' do
          expect(json.length).to eq(3)
        end
      end
    end

    def do_request(options = {})
      get '/api/v1/orders', options
    end
  end

  def error_messages_list(json)
    expect(json[:errors][:client_phone_number]).to eq(['не является числом', 'неверной длины (может быть длиной ровно 11 символа)', 'не может быть пустым'])
    expect(json[:errors][:address_start]).to eq(['не может быть пустым'])
    expect(json[:errors][:address_end]).to eq(['не может быть пустым'])
    expect(json[:errors][:taxi_arrival_dt]).to eq(['не может быть пустым'])
    expect(json[:errors][:taxi_arrival_tm]).to eq(['не может быть пустым'])
    expect(json[:errors][:payment_method]).to eq(['не может быть пустым'])
    expect(json[:errors][:car_class]).to eq(['не может быть пустым'])
    expect(json[:errors][:total_cost]).to eq(['не может быть пустым', 'не является числом'])
    expect(json[:errors][:dispatcher_commission]).to eq(['не является числом'])
    expect(json[:errors][:passenger_count]).to eq(['не является числом'])
  end
end
