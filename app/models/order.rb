class Order < ApplicationRecord
  belongs_to :author, class_name: 'User'

  validates :client_phone_number,
            numericality: { only_integer: true },
            length: { is: 11 },
            presence: true

  validates :address_start,
            :address_end,
            :taxi_arrival_dt,
            :taxi_arrival_tm,
            :payment_method,
            :car_class,
            :total_cost,
            presence: true

  validates :total_cost,
            :dispatcher_commission,
            numericality: true

  validates :passenger_count,
            numericality: { only_integer: true, greater_than: 0 }

  enum car_class: { economy: 0, business: 1, wagon: 2, comfort: 3, minivan: 4, minibus: 5, bus: 6 }
  enum payment_method: { to_driver: 0, to_card: 1 }
  enum status: { actual: 0 }
end
