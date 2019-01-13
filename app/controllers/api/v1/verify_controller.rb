class Api::V1::VerifyController < Api::V1::BaseController
  skip_before_action :check_if_unverified

  def create
    return render json: { errors: { timeout: ['Время ожидания не истекло'] } }, status: :unprocessable_entity if Time.now.utc - current_user.verify_sent_at <= 120.seconds

    current_user.generate_verify_token!
    current_user.send_verify_token

    respond_with current_user
  end

  def update
    current_user.verify(params[:code])

    respond_with current_user
  end
end
