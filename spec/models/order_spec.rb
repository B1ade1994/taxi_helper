require 'rails_helper'

RSpec.describe Order, type: :model do
  subject { build(:order) }

  context 'associations' do
    it { should belong_to(:author) }
  end

  context 'validations' do
    it { should validate_presence_of(:client_phone_number) }
    it { should validate_presence_of(:address_start) }
    it { should validate_presence_of(:address_end) }
    it { should validate_presence_of(:taxi_arrival_dt) }
    it { should validate_presence_of(:taxi_arrival_tm) }
    it { should validate_presence_of(:payment_method) }
    it { should validate_presence_of(:car_class) }
    it { should validate_presence_of(:total_cost) }

    it { should validate_length_of(:client_phone_number).is_equal_to(11) }
    it { should validate_numericality_of(:client_phone_number) }
    it { should validate_numericality_of(:total_cost) }
    it { should validate_numericality_of(:dispatcher_commission) }
    it { should validate_numericality_of(:passenger_count).is_greater_than(0) }
  end
end
