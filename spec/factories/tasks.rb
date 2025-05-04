FactoryBot.define do
  factory :task do
    title { "MyString" }
    details { "MyText" }
    due_date { "2025-04-28" }
    status { 1 }
    project { nil }
  end
end
