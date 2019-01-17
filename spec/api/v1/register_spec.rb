require 'rails_helper'

describe 'POST api/v1/register' do
  let(:url) { '/api/v1/register' }
  let(:params) do
    {
      api_v1_user: {
        phone_number: '71111111111',
        password: '12312312'
      }
    }
  end

  context 'with short password' do
    before do
      post url, params: {
        api_v1_user: {
          phone_number: '71111111111',
          password: '123'
        }
      }
    end

    it 'returns 422' do
      expect(response).to have_http_status(422)
    end

    it 'returns validation errors' do
      expect(json[:errors][:password]).to eq ['недостаточной длины (не может быть меньше 8 символа)']
    end
  end

  context 'with passwords do not match' do
    before do
      post url, params: {
        api_v1_user: {
          phone_number: '71111111111',
          password: '12345678',
          password_confirmation: '123'
        }
      }
    end

    it 'returns 422' do
      expect(response).to have_http_status(422)
    end

    it 'returns validation errors' do
      expect(json[:errors][:password_confirmation]).to eq ['пароль не совпадает']
    end
  end

  context 'with user is unauthenticated' do
    before { post url, params: params }

    it 'returns 201' do
      expect(response).to have_http_status(201)
    end

    it 'returns jwt' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns a new user' do
      expect(json[:phoneNumber]).to eq '71111111111'
    end
  end

  context 'with user already exists' do
    before do
      create(:user)
      post url, params: params
    end

    it 'returns 422' do
      expect(response).to have_http_status(422)
    end

    it 'returns validation errors' do
      expect(json[:errors][:phone_number]).to eq ['уже существует']
    end
  end
end
