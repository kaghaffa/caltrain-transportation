require File.expand_path('../boot', __FILE__)

ENV['RAILS_ENV'] ||= 'development'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # API
    config.autoload_paths += %W(#{config.root}/lib)


    config.action_dispatch.default_headers = {
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",") # or whatever else you would like to allow
    }

    # Add fonts to asset path
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')

    # Add bower components to asset path
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

    # Precompile fontss
    config.assets.precompile += %w(.svg .eot .woff .ttf)

    # Required for Heroku
    config.assets.initialize_on_precompile = false
  end
end
