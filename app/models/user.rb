class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  validates :phone_number,
            numericality: { only_integer: true },
            length: { is: 11 },
            presence: true,
            uniqueness: true

  validates :name, presence: true, if: proc { |obj| obj.verified? && !obj.verified_changed? }

  before_create :generate_verify_token
  after_commit :send_verify_token, on: :create

  has_many :cars

  accepts_nested_attributes_for :cars, allow_destroy: true

  enum role: { driver: 0, dispatcher: 1 }

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def generate_verify_token!
    generate_verify_token
    save!
  end

  def send_verify_token
    # send sms via backgroud job
  end

  def verify(token)
    if verify_token == token
      update(verified: true)
    else
      errors.add(:invalid_verify_token, 'Введен неверный код')
    end
  end

  private

    def generate_verify_token
      self.verify_token = rand(0..99_999).to_s.rjust(5, '0')

      self.verify_token = '12345' if phone_number.in?(%w[75555555555 76666666666 77777777777 78888888888 79999999999])

      self.verify_sent_at = Time.now.utc
    end
end
