class Api::V1::UsersController < Api::V1::BaseController
  def profile
    current_user.update_attributes(user_params)

    respond_with current_user
  end

  private

    def user_params
      params.require(:user).permit(:role, :personal_account, :name, cars_attributes: [:id, :brand, :model, :color, :number, :_destroy])
    end
end
