require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
Bundler.require(*Rails.groups)

module TaxiHelper
  class Application < Rails::Application
    config.app_generators.scaffold_controller :responders_controller

    # Disable cookies
    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.middleware.delete ActionDispatch::Flash
    config.action_controller.allow_forgery_protection = false

    config.load_defaults 5.2
    config.generators.system_tests = nil
    config.i18n.default_locale = :ru
    config.active_record.index_nested_attribute_errors = true
  end
end
