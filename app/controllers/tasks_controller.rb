class TasksController < ApplicationController
  before_action :authenticate_user! # Garante que o usuário está autenticado com JWT
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    Rails.logger.debug "Usuário atual: #{current_user.inspect}"
    @tasks = current_user.tasks
    render json: @tasks
  end

  # GET /tasks/:id
  def show
    puts "Usuário autenticado: #{current_user.inspect}"
    task = Task.find(params[:id])
    render json: task
  end

  # POST /tasks
  def create
    task = current_user.tasks.build(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: { message: 'Erro ao criar tarefa.', errors: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/:id
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:id]) # Busca a tarefa do usuário logado
  end

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end
end