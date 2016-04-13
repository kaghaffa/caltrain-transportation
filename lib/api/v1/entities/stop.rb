module API::V1::Entities
  class Stop < Grape::Entity
    expose :stop_name
    expose :stop_id
    expose :platform_code
  end
end