FactoryBot.define do
  factory :order do
    # association :author, factory: [:user, :verified]

    client_phone_number '71111111111'
    address_start 'Симферополь вокзал'
    address_end 'Севастополь'
    taxi_arrival_dt '20.03.2018'
    taxi_arrival_tm '18:45'
    payment_method 'to_card'
    car_class 'economy'
    passenger_count 1
    total_cost 200
    dispatcher_commission 20
  end
end
