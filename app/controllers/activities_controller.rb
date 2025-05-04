class ActivitiesController < ApplicationController
  before_action :set_project
  before_action :set_activity, only: [:show, :update, :destroy]

  # GET /projects/:project_id/activities
  def index
    @activities = @project.activities
    render json: @activities
  end

  # GET /projects/:project_id/activities/:id
  def show
    render json: @activity
  end

  # POST /projects/:project_id/activities
  def create
    @project = Project.find(params[:project_id])
    @activity = @project.activities.build(activity_params)
    if @project.nil?
      render json: { error: "Project not found" }, status: :not_found
      return
    end
    if @activity.save
      render json: @activity, status: :created
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /projects/:project_id/activities/:id
  def update
    if @activity.update(activity_params)
      render json: @activity, status: :ok
    else
      render json: { errors: @activity.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /projects/:project_id/activities/:id
  def destroy
    @activity.destroy
    head :no_content
  end

  private

  def set_project
    @project = current_user.projects.find(params[:project_id])
  end

  def set_activity
    @activity = @project.activities.find(params[:id])
  end

  def activity_params
    params.require(:activity).permit(:name, :start_date, :end_date, :is_finished)
  end
end