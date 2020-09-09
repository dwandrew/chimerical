class Chimera < ApplicationRecord
    has_many :blenders
    has_many :animals, through: :blenders
    validates :name, presence: true 
    validates :head, presence: true ,  exclusion: { in: %w(none),
    message: "Head Required" }
    validates :torso, presence: true,  exclusion: { in: %w(none),
    message: "Torso Required" }
    belongs_to :habitat


    # scope :top_ten, -> {self.order(warband_rating: :desc)}
end
