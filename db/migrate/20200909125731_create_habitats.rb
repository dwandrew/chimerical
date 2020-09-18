class CreateHabitats < ActiveRecord::Migration[6.0]
  def change
    create_table :habitats do |t|
      t.string :name
      t.string :temperature
      t.string :traits

      t.timestamps
    end
  end
end
