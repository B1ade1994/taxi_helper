class Order < ApplicationRecord
  belongs_to :author, class_name: 'User'

  validates :client_phone_number,
            numericality: { only_integer: true },
            length: { is: 11 },
            presence: true

  validates :address_start,
            :taxi_arrival_dt,
            :taxi_arrival_tm,
            :total_cost,
            presence: true

  validates :total_cost,
            :dispatcher_commission,
            numericality: true

  validates :passenger_count,
            numericality: { only_integer: true, greater_than: 0 }

  enum car_class: { economy: 0, business: 1, premium: 2 }
  enum payment_method: { cash_to_driver: 0, another: 1 }
  enum status: { actual: 0 }
end
