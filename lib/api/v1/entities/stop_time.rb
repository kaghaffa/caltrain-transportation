module API::V1::Entities
  class StopTime < Grape::Entity
    expose :schedule_name
    expose :departure_time
    expose :arrival_time do |t|
      t.arrival_time.strftime("%I:%M%p")
    end

    expose :total_time
  end
end