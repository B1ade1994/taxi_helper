class Api::V1::BaseController < ActionController::API
  before_action :authenticate_api_v1_user!

  respond_to :json
end
