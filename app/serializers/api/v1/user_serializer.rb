class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :id, :phone_number, :verified, :email
end
