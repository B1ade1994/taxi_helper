class Api::V1::OrderSerializer < ActiveModel::Serializer
  attributes :id,
             :author_id,
             :client_phone_number,
             :client_name,
             :address_start,
             :address_end,
             :flight_number,
             :taxi_arrival_dt,
             :taxi_arrival_tm,
             :car_class,
             :passenger_count,
             :payment_method,
             :comment,
             :total_cost,
             :dispatcher_commission

  def taxi_arrival_dt
    object.taxi_arrival_dt.strftime('%d.%m.%Y')
  end

  def taxi_arrival_tm
    object.taxi_arrival_tm.strftime('%H:%M')
  end

  def attributes(*args)
    return super unless @instance_options[:index_page]

    attributes_to_remove = [:client_phone_number, :client_name, :flight_number, :passenger_count, :payment_method, :comment]
    super.except(*attributes_to_remove)
  end
end
