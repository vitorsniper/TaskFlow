class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :details
      t.date :due_date
      t.integer :status
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
