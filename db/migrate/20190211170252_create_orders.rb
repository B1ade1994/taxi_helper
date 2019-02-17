class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.belongs_to :author

      t.string :client_phone_number
      t.string :client_name
      t.string :address_start
      t.string :address_end
      t.string :flight_number
      t.string :comment

      t.date :taxi_arrival_dt, index: true
      t.time :taxi_arrival_tm, index: true

      t.integer :car_class
      t.integer :passenger_count
      t.integer :payment_method
      t.integer :status

      t.decimal :total_cost, precision: 6, scale: 0
      t.decimal :dispatcher_commission, precision: 6, scale: 0

      t.timestamps
    end
  end
end
