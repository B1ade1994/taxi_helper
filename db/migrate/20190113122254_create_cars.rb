class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.belongs_to :user

      t.string :brand
      t.string :model
      t.string :color
      t.string :number

      t.timestamps
    end
  end
end
