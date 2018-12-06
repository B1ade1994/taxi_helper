require 'rails_helper'
require 'devise/jwt/test_helpers'

describe 'Verify API' do
  let!(:user) { create(:user) }
  let(:headers) {{ 'Accept' => 'application/json', 'Content-Type' => 'application/json' }}
  let(:auth_headers) { Devise::JWT::TestHelpers.auth_headers(headers, user) }

  describe 'POST /api/v1/verify' do
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      it 'returns 201' do
        now = Time.now.utc + 120.seconds
        allow(Time).to receive(:now) { now }

        post '/api/v1/verify', headers: auth_headers
        expect(response).to have_http_status(201)
      end

      it 'returns timeout error if less than 120 seconds have passed from the last request' do
        post '/api/v1/verify', headers: auth_headers
        expect(json[:timeout]).to eq(['Время ожидания не истекло'])
      end
    end

    def do_request(options = {})
      post '/api/v1/verify', options
    end
  end

  describe 'PUT /api/v1/verify' do
    it_behaves_like 'API Authenticable'

    context 'authenticated' do
      context 'valid token' do
        it 'returns 204' do
          put '/api/v1/verify', params: { code: user.verify_token }.to_json, headers: auth_headers
          expect(response).to have_http_status(204)
        end
      end

      context 'invalid token' do
        it 'returns invalid verify token error' do
          put '/api/v1/verify', params: { code: '123' }.to_json, headers: auth_headers
          expect(json[:errors][:invalid_verify_token]).to eq(["Введен неверный код"])
        end
      end
    end

    def do_request(options = {})
      put '/api/v1/verify', options
    end
  end
end