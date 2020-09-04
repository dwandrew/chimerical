class CreateChimeras < ActiveRecord::Migration[6.0]
  def change
    create_table :chimeras do |t|
      t.string :name
      t.string :wings
      t.string :legs
      t.string :tail
      t.string :torso
      t.string :head

      t.timestamps
    end
  end
end
