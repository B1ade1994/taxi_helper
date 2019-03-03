class Api::V1::OrdersController < Api::V1::BaseController
  load_and_authorize_resource

  def index
    @orders = if current_user.dispatcher?
                current_user.orders
              else
                Order.all
              end

    if params[:query].present?
      params[:query] = params[:query].transform_keys(&:underscore)
      params[:query][:car_class_eq] = '' if params[:query][:car_class_eq] == 'any'
    end

    @orders = @orders.ransack(params[:query]).result

    render json: @orders, index_page: true
  end

  def create
    @order = current_user.orders.create(order_params)

    respond_with @order
  end

  def show
    respond_with @order
  end

  def update
    @order.update_attributes(order_params)
    respond_with @order
  end

  # def destroy
  #   respond_with @order.destroy
  # end

  private

    def order_params
      params.require(:order).permit(:client_phone_number, :client_name, :address_start, :address_end, :flight_number, :comment, :taxi_arrival_dt, :taxi_arrival_tm, :car_class, :passenger_count, :payment_method, :total_cost, :dispatcher_commission)
    end
end
