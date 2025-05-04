FactoryBot.define do
  factory :project do
    name { "MyString" }
    description { "MyText" }
    start_date { "2025-04-28" }
    end_date { "2025-04-28" }
    user { nil }
  end
end
