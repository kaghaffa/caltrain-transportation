class StopTime < ActiveRecord::Base
  has_one :stop, foreign_key: :stop_id, primary_key: :stop_id

  class << self
    def trip_has_stop?(trip_id, stop_id)
      StopTime.where(trip_id: trip_id).to_a.any? do |st|
        st.stop.stop_id == stop_id
      end
    end

    def trip_stop_info(trip_id, departing_stop_id, arriving_stop_id)
      trip_stops = where(trip_id: trip_id)

      departing_stop_time = trip_stops.where(stop_id: departing_stop_id).first
      arriving_stop_time = trip_stops.where(stop_id: arriving_stop_id).first

      departing_time = departing_stop_time.departure_time
      arriving_time = arriving_stop_time.departure_time

      {
        departing_time: departing_time.strftime("%I:%M%p"),
        arriving_time: arriving_time.strftime("%I:%M%p"),
        trip_time: arriving_time - departing_time,
        schedule_name: departing_stop_time.schedule_name
      }
    end
  end # Class Methods
end
