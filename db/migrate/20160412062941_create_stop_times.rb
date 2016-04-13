class CreateStopTimes < ActiveRecord::Migration
  def change
    create_table :stop_times do |t|
      t.time    :arrival_time,   null: false
      t.time    :departure_time, null: false
      t.integer :stop_id,        null: false
      t.string  :schedule_name,  null: false
      t.timestamps
    end

    add_index :stop_times, :stop_id
  end
end
