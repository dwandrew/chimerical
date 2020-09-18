class CreateAnimals < ActiveRecord::Migration[6.0]
  def change
    create_table :animals do |t|
      t.string :name
      t.boolean :wings
      t.boolean :legs
      t.boolean :tail

      t.timestamps
    end
  end
end
