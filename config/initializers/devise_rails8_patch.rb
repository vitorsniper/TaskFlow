# Corrige incompatibilidade entre Devise e Rails 8 ao lidar com CSRF
ActiveSupport.on_load(:action_controller) do
  ActionController::Base.class_eval do
    def handle_unverified_request
      flash[:alert] = "Invalid authenticity token" if respond_to?(:flash)
      super
    end
  end
end