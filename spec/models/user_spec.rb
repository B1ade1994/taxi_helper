require 'rails_helper'
require 'cancan/matchers'

RSpec.describe User, type: :model do
  subject { build(:user) }

  context 'associations' do
    it { should have_many(:cars) }
  end

  context 'validations' do
    context 'basic' do
      it { should validate_presence_of(:phone_number) }
      it { should validate_length_of(:phone_number).is_equal_to(11) }
      it { should validate_numericality_of(:phone_number) }
      it { should validate_uniqueness_of(:phone_number).case_insensitive }
      it { should validate_presence_of(:password) }
    end
    context 'when verified' do
      before { subject.update_attributes(verified: true) }

      it { should validate_presence_of(:name) }
    end
  end

  context 'callbacks' do
    it 'should generate verify token after creating' do
      expect(subject).to receive(:generate_verify_token)
      subject.save!
    end

    it 'should send verify token after creating' do
      expect(subject).to receive(:send_verify_token)
      subject.save!
    end
  end

  context 'methods' do
    describe '#generate_verify_token' do
      let!(:now) { Time.now.utc }
      before do
        allow(Time).to receive(:now) { now }
        subject.save!
      end

      it 'should generate verify_token' do
        expect(subject.verify_token.length).to eq(5)
      end

      it 'should generate verify_sent_at' do
        expect(subject.verify_sent_at).to eq now
      end
    end

    describe '#generate_verify_token!' do
      before { subject.save! }

      it 'should generate new verify_token' do
        old_token = subject.verify_token

        subject.generate_verify_token!
        expect(subject.verify_token).not_to eq(old_token)
      end

      it 'should generate new verify_sent_at' do
        old_sent_at = subject.verify_sent_at

        subject.generate_verify_token!
        expect(subject.verify_sent_at).not_to eq(old_sent_at)
      end
    end

    describe '#verify' do
      before { subject.save! }

      context 'valid token' do
        it 'update verified attribute to true if tokens are equal' do
          token = subject.verify_token
          subject.verify(token)
          expect(subject.verified?).to be(true)
        end
      end

      context 'invalid token' do
        it 'returns an error message' do
          subject.verify('123')
          expect(subject.errors[:invalid_verify_token]).to eq(['Введен неверный код'])
        end

        it 'dont update verified' do
          subject.verify('123')
          expect(subject.verified?).to be(false)
        end
      end
    end
  end

  describe 'abilities' do
    subject(:ability) { Ability.new(user) }

    context 'Driver' do
      let!(:user) { create(:user, :driver, :verified) }

      it { is_expected.to be_able_to(:index, Order) }
      it { is_expected.to_not be_able_to(:create, Order) }
      it { is_expected.to_not be_able_to(:read, Order) }
      it { is_expected.to_not be_able_to(:update, Order) }
      it { is_expected.to_not be_able_to(:destroy, Order) }
    end

    context 'Dispatcher' do
      let!(:user) { create(:user, :dispatcher, :verified) }
      let!(:another_user) { create(:user, :dispatcher, :verified, phone_number: '72222222222') }
      let!(:user_order) { create(:order, author: user) }
      let!(:another_user_order) { create(:order, author: another_user) }

      it { is_expected.to be_able_to(:index, Order) }
      it { is_expected.to be_able_to(:create, Order) }

      context "when user is order's author" do
        it { is_expected.to be_able_to(:show, user_order) }
        it { is_expected.to be_able_to(:update, user_order) }
        it { is_expected.to be_able_to(:destroy, user_order) }
      end

      context "when user doesn'r order's author" do
        it { is_expected.to_not be_able_to(:show, another_user_order) }
        it { is_expected.to_not be_able_to(:update, another_user_order) }
        it { is_expected.to_not be_able_to(:destroy, another_user_order) }
      end
    end
  end
end
