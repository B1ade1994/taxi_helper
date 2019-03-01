require 'rails_helper'

RSpec.describe Car, type: :model do
  subject { build(:car) }

  context 'associations' do
    it { should belong_to(:user) }
  end

  context 'validations' do
    it { should validate_presence_of(:brand) }
    it { should validate_presence_of(:model) }
    it { should validate_presence_of(:color) }
    it { should validate_presence_of(:number) }
  end
end
