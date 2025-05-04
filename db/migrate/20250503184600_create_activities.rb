class CreateActivities < ActiveRecord::Migration[8.0]
  def change
    create_table :activities do |t|
      t.references :project, null: false, foreign_key: true
      t.string :name
      t.date :start_date
      t.date :end_date
      t.boolean :is_finished

      t.timestamps
    end
  end
end
