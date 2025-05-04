class UsersController < ApplicationController
  before_action :authenticate_user!

  def profile
    render json: { message: "Olá, #{current_user.email}!" }
  end
end