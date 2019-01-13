class Api::V1::CarSerializer < ActiveModel::Serializer
  attributes :id, :brand, :model, :color, :number
  belongs_to :user
end
