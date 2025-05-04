class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :project_id, :name, :start_date, :end_date, :is_finished
  
  def start_date
    object.start_date.strftime('%Y-%m-%d') if object.start_date.present?
  end

  def end_date
    object.end_date.strftime('%Y-%m-%d') if object.end_date.present?
  end
end