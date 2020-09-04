class ChimerasController < ApplicationController
  before_action :set_chimera, only: [:show, :update, :destroy]

  # GET /chimeras
  def index
    @chimeras = Chimera.all

    render json: @chimeras
  end

  # GET /chimeras/1
  def show
    render json: @chimera
  end

  # POST /chimeras
  def create
    @chimera = Chimera.new(chimera_params)
    binding.pry
  if @chimera.save
    if @chimera.head != "none"
      animal = Animal.find_by_name(@chimera.head)
      animal.chimeras << @chimera
    end  
    if @chimera.torso != "none"
      animal = Animal.find_by_name(@chimera.torso)
      animal.chimeras << @chimera
    end  
    if @chimera.legs != "none"
      animal = Animal.find_by_name(@chimera.legs)
      animal.chimeras << @chimera
    end  
    if @chimera.wings != "none"
      animal = Animal.find_by_name(@chimera.wings)
      animal.chimeras << @chimera
    end  
    if @chimera.tail != "none"
      animal = Animal.find_by_name(@chimera.tail)
      animal.chimeras << @chimera
    end  
      render json: @chimera, status: :created, location: @chimera
    else
      render json: @chimera.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chimeras/1
  def update
    if @chimera.update(chimera_params)
      render json: @chimera
    else
      render json: @chimera.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chimeras/1
  def destroy
    @chimera.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chimera
      @chimera = Chimera.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def chimera_params
      params.require(:chimera).permit(:name, :wings, :legs, :tail, :torso, :head)
    end
end
