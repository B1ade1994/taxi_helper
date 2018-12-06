require 'rails_helper'

describe 'POST api/v1/login' do
  let!(:user) { create(:user) }
  let(:url) { '/api/v1/login' }
  let(:params) do
    {
      api_v1_user: {
        phone_number: user.phone_number,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    before do
      post url, params: params
    end

    it 'returns 201' do
      expect(response).to have_http_status(201)
    end

    it 'returns jwt' do
      expect(response.headers['Authorization']).to be_present
    end
  end

  context 'when params are incorrect' do
    before { post url }

    it 'returns 401' do
      expect(response).to have_http_status(401)
    end

    it 'returns error message' do
      expect(json[:error]).to eq 'Вам необходимо войти в систему или зарегистрироваться.'
    end
  end
end

describe 'DELETE api/v1/logout' do
  let(:url) { '/api/v1/logout' }

  it 'returns 204' do
    delete url
    expect(response).to have_http_status(204)
  end
end
