module API::V1::Resources
  class Stops  < Grape::API
    resource 'stops' do
      # GET /api/v1/stops
      get do
        stops = Stop.all.map do |s|
          {
            stop: s.stop_name,
            id: s.stop_id,
            platform_code: s.platform_code
          }
        end
        .reduce({}) do |a,s|
          (a[s[:stop]] ||= {})[s[:platform_code]] = s[:id]
          a
        end
        .reject { |_,v| v.size < 2 }
        .to_a

        present stops
      end

      namespace ':id' do
        namespace 'stop_times' do
          # GET /api/v1/stops/:id/stop_times
          params do
            requires :schedule_name,  type: String
            requires :arriving_stop_id,  type: String
            optional :time_of_day,    type: String
          end
          get do
            departing_stop = Stop.where(stop_id: params[:id]).first
            error!(:stop_not_found) unless departing_stop

            arriving_stop = Stop.where(stop_id: params[:arriving_stop_id]).first
            error!(:arriving_stop_not_found) unless arriving_stop

            schedule_name = case params[:schedule_name]
            when 'weekday'
              'Combo-Weekday-01'
            when 'saturday'
              'Caltrain-Saturday-02'
            when 'sunday'
              'Caltrain-Sunday-02'
            end

            trip_info = departing_stop.stop_times
              .where(schedule_name: schedule_name)
              .sort_by { |st| st.arrival_time }
              .map(&:trip_id)
              .select do |trip_id|
                StopTime.trip_has_stop?(trip_id, arriving_stop.stop_id)
              end
              .map do |trip_id|
                StopTime.trip_stop_info(
                  trip_id,
                  params[:id],
                  params[:arriving_stop_id]
                )
              end

            present({ trips: trip_info })
          end
        end
      end # :id
    end # stops
  end # Stops
end # Resources
