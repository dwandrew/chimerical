class Animal < ApplicationRecord
    has_many :blenders
    has_many :chimeras, through: :blenders
end
