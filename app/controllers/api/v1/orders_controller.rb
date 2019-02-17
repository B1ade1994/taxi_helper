class Api::V1::OrdersController < Api::V1::BaseController
  before_action :load_order, only: %i[show update destroy]

  def index
    @orders = if current_user.dispatcher?
                current_user.orders
              else
                Order.all
              end

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

  def destroy
    respond_with @order.destroy
  end

  private

    def order_params
      params.require(:order).permit(:client_phone_number, :client_name, :address_start, :address_end, :flight_number, :comment, :taxi_arrival_dt, :taxi_arrival_tm, :car_class, :passenger_count, :payment_method, :total_cost, :dispatcher_commission)
    end

    def load_order
      @order = Order.find(params[:id])
    end
end
