class Stop < ActiveRecord::Base
  has_many :stop_times, foreign_key: :stop_id, primary_key: :stop_id

  class << self
    def stop_names
      @__stop_names ||= Stop.all.map(&:stop_name).uniq
    end

    def valid_stop?(stop_name)
      stop_names.include?(stop_name)
    end

    def stop_id_of(stop_name)
      where(stop_name: stop_name).first.stop_id
    end
  end # Class Methods
end
