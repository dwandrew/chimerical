class AddHabitatIdToChimeras < ActiveRecord::Migration[6.0]
  def change
    add_column :chimeras, :habitat_id, :integer
  end
end
