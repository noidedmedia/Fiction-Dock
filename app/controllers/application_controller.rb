##
# Root controller for FictionDock.
# Contains methods we need on most (if not all) controllers
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from Pundit::NotAuthorizedError, with: :not_allowed
  # Adds different "flash[:type]" types.
  add_flash_types :warning, :info
  before_action :set_locale
  before_action :configure_permitted_devise_params, if: :devise_controller?

  def not_allowed
    respond_to do |format|
      format.html {render "shared/403", status: :forbidden}
      format.json {head :forbidden}
    end
  end
  def per_page
    params["per_page"] or 20
  end

  def page
    params["page"] or 1
  end
  
  def accepted_content
    if params["content"]
      params["content"]
    elsif current_user && (c = current_user.content_pref)
      c
    else
      nil
    end
  end
  
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
