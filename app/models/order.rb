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

  enum car_class: { any: 0, economy: 1, business: 2, wagon: 3, comfort: 4, minivan: 5, minibus: 6, bus: 7 }
  enum payment_method: { to_driver: 0, to_card: 1 }
  enum status: { actual: 0 }
end
