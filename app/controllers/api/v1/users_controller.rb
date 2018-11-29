class Api::V1::UsersController < Api::V1::BaseController
  def index
    @users = User.all
    respond_with @users
  end
end
