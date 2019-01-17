FactoryBot.define do
  factory :car do
    association(:user, :verified)

    brand 'ВАЗ'
    model '2107'
    color 'Красный'
    number 'vs394a99'
  end
end
