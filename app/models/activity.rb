class Activity < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :project_id, presence: true
  validates :is_finished, inclusion: { in: [true, false] }, allow_nil: true
end