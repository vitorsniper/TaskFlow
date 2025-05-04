class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: [:create]
  respond_to :json

  def create
    build_resource(sign_up_params)

    if User.exists?(email: sign_up_params[:email])
      render json: { error: 'E-mail já está em uso.' }, status: :conflict
      return
    end

    if resource.save
      render json: { message: 'Usuário criado com sucesso.', user_id: resource.id }, status: :created
    else
      render json: { error: resource.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end