class StopTime < ActiveRecord::Base
  has_one :stop, foreign_key: :stop_id, primary_key: :stop_id
end
