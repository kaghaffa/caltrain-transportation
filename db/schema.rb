# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160412063214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stop_times", force: true do |t|
    t.time     "arrival_time",   null: false
    t.time     "departure_time", null: false
    t.integer  "stop_id",        null: false
    t.integer  "trip_id",        null: false
    t.string   "schedule_name",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stop_times", ["stop_id"], name: "index_stop_times_on_stop_id", using: :btree

  create_table "stops", force: true do |t|
    t.integer  "stop_id",       null: false
    t.string   "stop_name",     null: false
    t.string   "platform_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "stops", ["stop_id", "stop_name"], name: "index_stops_on_stop_id_and_stop_name", unique: true, using: :btree

end
