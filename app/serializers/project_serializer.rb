class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :completion_percentage, :delayed

  has_many :activities, if: -> { object.activities.any? }

  def completion_percentage
    "#{object.completion_percentage}%"
  end

  def delayed
    object.delayed?
  end

  def start_date
    object.start_date.strftime('%Y-%m-%d') if object.start_date.present?
  end

  def end_date
    object.end_date.strftime('%Y-%m-%d') if object.end_date.present?
  end
end