class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.integer :stop_id,   null: false
      t.string  :stop_name, null: false
      t.string  :platform_code

      t.timestamps
    end

    add_index :stops, ["stop_id", "stop_name"], unique: true
  end
end
