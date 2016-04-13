module API::V1::Resources
  class Caltrain  < Grape::API
    resource 'caltrain' do
      namespace 'stops' do
        # GET /api/v1/muni/stops
        params do
          optional :platform_code, type: String
        end
        get do
          puts params[:platform_code].inspect
          if params[:platform_code]
            stops = Stop.where(platform_code: params[:platform_code]).to_a
          else
            stops = Stop.all
          end

          present stops, with: API::V1::Entities::Stop
        end

        namespace ':id' do
          namespace 'stop_times' do
            # GET /api/v1/muni/stops/:id/stop_times
            params do
              requires :schedule_name, type: String
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
    end # caltrain
  end
end
