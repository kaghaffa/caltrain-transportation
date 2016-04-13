module API
  class Root < Grape::API
    format :json
    rescue_from :all
    mount API::V1::Root
  end
end