module API::V1
  class Root < Grape::API
    version 'v1', :using => :path
    format :json

    if Rails.env.production?
      require 'rack/ssl-enforcer'
      use Rack::SslEnforcer
    end

    rescue_from :all do |e|
      msg = {
        error: e.class.name.gsub(/.+:/, '').underscore # Remove module(s) from name.
      }

      if Rails.env.staging? || Rails.env.development? || Rails.env.test?
        msg[:message] = e.message
        msg[:backtrace] = e.backtrace
      end

      rack_response msg.to_json, 500
    end

    # helpers API::V1::Helpers::UserHelpers
    # helpers API::V1::Helpers::ErrorHelpers

    rescue_from Grape::Exceptions::ValidationErrors do |e|
      msg = {
        error: :validation_errors,
        validation_errors: []
      }

      e.errors.each do |err|
        msg[:validation_errors] << "#{err.first.join(', ')} #{err[1].first.message}"
      end

      rack_response msg.to_json, 400
    end

    ##
    # Resources
    mount API::V1::Resources::Stops
  end
end
