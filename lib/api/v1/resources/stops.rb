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

        present stops
      end

      namespace ':id' do
        namespace 'stop_times' do
          # GET /api/v1/stops/:id/stop_times
          params do
            requires :schedule_name, type: String
            requires :departing_stop, type: String
            requires :arriving_stop, type: String
          end
          get do
            stop = Stop.where(stop_id: params[:id]).first
            error!(:stop_not_found) unless stop

            schedule_name = case params[:schedule_name]
            when 'weekday'
              'Combo-Weekday-01'
            when 'saturday'
              'Caltrain-Saturday-02'
            when 'sunday'
              'Caltrain-Sunday-02'
            end

            stop_times = stop.stop_times.where(schedule_name: schedule_name)
              .sort_by { |st| st.arrival_time }
            present stop_times, with: API::V1::Entities::StopTime
          end
        end
      end # :id
    end # stops
  end # Stops
end # Resources
