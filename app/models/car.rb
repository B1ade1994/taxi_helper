class Car < ApplicationRecord
  belongs_to :user

  validates :brand,
            :model,
            :color,
            :number,
            presence: true
end
