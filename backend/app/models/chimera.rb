class Chimera < ApplicationRecord
    has_many :blenders
    has_many :animals, through: :blenders
    validates :name, presence: true 
    validates :head, presence: true 
    validates :torso, presence: true 
end
