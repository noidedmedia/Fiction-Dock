##
# Root controller for FictionDock.
# Contains methods we need on most (if not all) controllers
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_devise_params, if: :devise_controller?

  ##
  # Configure the permitted parameters for devise
  def configure_permitted_devise_params
    devise_parameter_sanitizer.for(:sign_up) << :name
  end

  ##
  # Add a query string for the Locale if needed. 
  def default_url_options(options = {})
    return options if I18n.locale == I18n.default_locale
    { locale: I18n.locale}.merge options
  end

  ##
  # Set the locale. 
  # Locales are either in the URL, or the default (English).
  # If they're in the URL, they should be in params[:locale]
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
