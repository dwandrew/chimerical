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
  if @chimera.save
    if @chimera.head != "none"
      animal = Animal.find_by_name(@chimera.head)
      if !animal.chimeras.include?(@chimera)
      animal.chimeras << @chimera
      animal.save
      end
      if !@chimera.animals.include?(animal)
        @chimera.animals << animal
        @chimera.save
      end
    end  
    if @chimera.torso != "none"
      animal = Animal.find_by_name(@chimera.torso)
      if !animal.chimeras.include?(@chimera)
        animal.chimeras << @chimera
        animal.save
        end
      if !@chimera.animals.include?(animal)
      @chimera.animals << animal
      @chimera.save
      end
    end  
    if @chimera.legs != "none"
      animal = Animal.find_by_name(@chimera.legs)
      if !animal.chimeras.include?(@chimera)
        animal.chimeras << @chimera
        animal.save
        end
      if !@chimera.animals.include?(animal)
        @chimera.animals << animal
        @chimera.save
      end
    end  
    if @chimera.wings != "none"
      animal = Animal.find_by_name(@chimera.wings)
      if !animal.chimeras.include?(@chimera)
        animal.chimeras << @chimera
        animal.save
        end
      if !@chimera.animals.include?(animal)
        @chimera.animals << animal
        @chimera.save
      end
    end  
    if @chimera.tail != "none"
      animal = Animal.find_by_name(@chimera.tail)
      if !animal.chimeras.include?(@chimera)
        animal.chimeras << @chimera
        animal.save
        end
      if !@chimera.animals.include?(animal)
        @chimera.animals << animal
        @chimera.save
      end
      
    end  
      render json: @chimera, status: :created, location: @chimera
    else
      render json: @chimera.errors, status: :unprocessable_entity, message: @chimera.errors.full_messages
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
