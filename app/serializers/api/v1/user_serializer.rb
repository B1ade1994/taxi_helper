class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :phone_number, :verified, :email, :role, :name, :personal_account, :rating
  has_many :cars
end
