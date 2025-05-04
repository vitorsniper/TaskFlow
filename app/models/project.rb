class Project < ApplicationRecord
  belongs_to :user

  has_many :activities, dependent: :destroy

  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  accepts_nested_attributes_for :activities, allow_destroy: true

  def completion_percentage
    return 0 if activities.count == 0
    completed = activities.where(is_finished: true).count
    ((completed.to_f / activities.count) * 100).round(2)
  end

  def delayed?
    activities.where(is_finished: false).where('end_date < ?', Date.today).exists?
  end
end
