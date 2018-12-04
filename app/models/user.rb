class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable,
         :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist

  validates :phone_number,
            numericality: { only_integer: true },
            length: { is: 11 },
            presence: true,
            uniqueness: true

  before_create :generate_verify_token
  after_commit :send_verify_token, on: :create

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def generate_sms_token
    generate_verify_token
    save!
  end

  def send_sms_token
    send_verify_token
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
      self.verify_sent_at = Time.now.utc

      self.verify_token = '12345'
    end

    def send_verify_token
      # send sms via backgroud job
    end
end
