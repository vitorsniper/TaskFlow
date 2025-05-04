class RemoveFieldsFromTasks < ActiveRecord::Migration[8.0]
  def change
    remove_column :tasks, :details, :string
    remove_column :tasks, :due_date, :datetime
    remove_column :tasks, :project_id, :integer
  end
end
