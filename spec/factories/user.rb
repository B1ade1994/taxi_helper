FactoryBot.define do
  factory :user do
    phone_number '71111111111'
    password '12345678'

    trait :verified do
      verified true
      verify_sent_at Time.now
    end

    trait :driver do
      role 'driver'
    end

    trait :dispatcher do
      role 'dispatcher'
    end
  end
end
