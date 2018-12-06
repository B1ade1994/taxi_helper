shared_examples_for 'API Authenticable' do
  context 'unauthenticated' do
    it 'returns 401 if there is no access token' do
      do_request
      expect(response).to have_http_status(401)
    end

    it 'returns 401 if access token is invalid' do
      do_request(headers: { Authorization: '12345' })
      expect(response).to have_http_status(401)
    end
  end
end