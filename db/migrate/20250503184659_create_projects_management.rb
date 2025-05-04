class CreateProjectsManagement < ActiveRecord::Migration[8.0]
  def change
    create_table :projects_managements do |t|
      t.string :name
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
