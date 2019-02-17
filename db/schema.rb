# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_11_170252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cars", force: :cascade do |t|
    t.bigint "user_id"
    t.string "brand"
    t.string "model"
    t.string "color"
    t.string "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cars_on_user_id"
  end

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "user_id"
    t.string "client_phone_number"
    t.string "client_name"
    t.string "address_start"
    t.string "address_end"
    t.string "flight_number"
    t.string "comment"
    t.date "taxi_arrival_dt"
    t.time "taxi_arrival_tm"
    t.integer "car_class"
    t.integer "passenger_count"
    t.integer "payment_method"
    t.integer "status"
    t.decimal "total_cost", precision: 6, scale: 2
    t.decimal "dispatcher_commission", precision: 6, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["taxi_arrival_dt"], name: "index_orders_on_taxi_arrival_dt"
    t.index ["taxi_arrival_tm"], name: "index_orders_on_taxi_arrival_tm"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "phone_number", null: false
    t.string "email"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "verify_token"
    t.boolean "verified", default: false
    t.datetime "verify_sent_at"
    t.integer "role", default: 0
    t.string "name"
    t.string "personal_account"
    t.float "rating", default: 0.0
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
