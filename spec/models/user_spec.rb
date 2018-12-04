require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  context 'validations' do
    it { should validate_presence_of(:phone_number) }
    it { should validate_length_of(:phone_number).is_equal_to(11) }
    it { should validate_numericality_of(:phone_number) }
    it { should validate_uniqueness_of(:phone_number).case_insensitive }
    it { should validate_presence_of(:password) }
  end
end
