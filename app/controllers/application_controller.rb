class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session # Para APIs usando cookies
  skip_before_action :verify_authenticity_token # Evita erro CSRF nas requisições do frontend

  before_action :authenticate_user!
end
