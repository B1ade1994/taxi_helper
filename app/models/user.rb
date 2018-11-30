class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist
         # :confirmable

  validates :phone_number,
            numericality: { only_integer: true },
            length: { is: 11 },
            presence: true,
            uniqueness: true

  def email_required?
    false
  end

  def email_changed?
    false
  end
end
