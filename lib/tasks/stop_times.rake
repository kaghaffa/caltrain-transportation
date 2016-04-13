require 'csv'

namespace :load do
  task :stops => :environment do |task, args|
    CSV.foreach('caltrain_google_transit/stops.txt', :headers => true) do |csv_obj|
      next unless csv_obj['stop_id'].starts_with?('7')

      Stop.create!(
        stop_id: csv_obj['stop_id'],
        stop_name: csv_obj['stop_name'],
        platform_code: csv_obj['platform_code']
      )
    end
  end

  task :stop_times => :environment do |task, args|
    CSV.foreach('caltrain_google_transit/stop_times.txt', :headers => true) do |csv_obj|
      next unless csv_obj['stop_id'] && csv_obj['arrival_time'] && csv_obj['departure_time']
      next unless csv_obj['arrival_time'] < "24:00:00"
      next unless csv_obj['departure_time'] < "24:00:00"
      next if csv_obj['trip_id'].include?('PresDay')

      begin
        StopTime.create!(
          stop_id: csv_obj['stop_id'],
          arrival_time: csv_obj['arrival_time'],
          departure_time: csv_obj['departure_time'],
          schedule_name: csv_obj['trip_id'].split('CT-').last
        )
      rescue Exception => e
        puts csv_obj.inspect
        raise
      end
    end
  end
end