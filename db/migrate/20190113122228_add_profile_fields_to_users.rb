class AddProfileFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :role, :integer, default: 0
    add_column :users, :name, :string
    add_column :users, :personal_account, :string
    add_column :users, :rating, :float, default: 0.0
  end
end
