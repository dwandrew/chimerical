class ChimerasController < ApplicationController
  before_action :set_chimera, only: [:show, :update, :destroy]

  # GET /chimeras
  def index
    @chimeras = Chimera.all
    @chimeras = @chimeras.sort_by{|e| e.name}
    render json: @chimeras, include: [:habitat, :size]
  end

  # GET /chimeras/1
  def show
    render json: @chimera, include: [:habitat, :size]
  end

  # POST /chimeras
  def create
    habitat = find_habitat(params[:chimera][:habitat])
    size = Size.find_by_name(params[:chimera][:size])
    @chimera = habitat.chimeras.build(chimera_params)
    size.chimeras << @chimera
    @chimera.size = size
    if @chimera.head != "none"
      animal = Animal.find_by_name(@chimera.head)
      @chimera.head = animal.name
      set_associations(animal, @chimera)
    end  
    if @chimera.torso != "none" 
      animal = Animal.find_by_name(@chimera.torso)
      @chimera.torso = animal.name
      set_associations(animal, @chimera)
    end  
    if @chimera.legs != ""
      animal = Animal.find_by_name(@chimera.legs)
      @chimera.legs = animal.name
      set_associations(animal, @chimera)
    end  
    if @chimera.wings != "" 
      animal = Animal.find_by_name(@chimera.wings)
      @chimera.wings = animal.name
      set_associations(animal, @chimera)
    end  
    if @chimera.tail != "" 
      animal = Animal.find_by_name(@chimera.tail)
      @chimera.tail = animal.name
      set_associations(animal, @chimera)
    end 
    if @chimera.save 
      render json: @chimera, status: :created, location: @chimera, include: [:habitat, :size]
    else
      render json: @chimera.errors, status: :unprocessable_entity, message: @chimera.errors.full_messages
    end
  end

  # PATCH/PUT /chimeras/1
  def update
    if @chimera.update(chimera_params)
      @chimera.animals = []
      size = find_size(params[:chimera][:size])
      @chimera.size = size
      habitat = find_habitat(params[:chimera][:habitat])
      @chimera.habitat = habitat
      if @chimera.head != "none"
        animal = Animal.find_by_name(@chimera.head)
        set_associations(animal, @chimera)
      end  
      if @chimera.torso != "none"
        animal = Animal.find_by_name(@chimera.torso)
        set_associations(animal, @chimera)
      end  
      if @chimera.legs != "none"
        animal = Animal.find_by_name(@chimera.legs)
        set_associations(animal, @chimera)
      end  
      if @chimera.wings != "none"
        animal = Animal.find_by_name(@chimera.wings)
        set_associations(animal, @chimera)
      end  
      if @chimera.tail != "none"
        animal = Animal.find_by_name(@chimera.tail)
        set_associations(animal, @chimera)
      end
      @chimera.save  
      render json: @chimera, include: [:habitat, :size]
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

    def find_habitat(name)
      Habitat.find_by_name(name)
    end

    def find_size(size)
      Size.find_by_name(size)
    end

    def set_associations(animal, chimera)
      if animal != nil
      if !animal.chimeras.include?(chimera)
        animal.chimeras << chimera
        animal.save
        end
      if !chimera.animals.include?(animal)
        chimera.animals << animal
        chimera.save
      end
      end
    end
end
