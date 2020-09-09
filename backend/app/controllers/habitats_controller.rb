class HabitatsController < ApplicationController

    def index
        @habitats = Habitat.all 
        render json: @habitats
    end
end
