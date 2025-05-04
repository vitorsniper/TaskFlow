class AddCompletionPercentageToProjects < ActiveRecord::Migration[8.0]
  def change
    add_column :projects, :completion_percentage, :integer
  end
end
