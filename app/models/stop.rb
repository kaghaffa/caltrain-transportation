class Stop < ActiveRecord::Base
  has_many :stop_times, foreign_key: :stop_id, primary_key: :stop_id

  class << self
    def unique_stops
    end
  end # Class Methods
end
