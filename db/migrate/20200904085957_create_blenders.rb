class CreateBlenders < ActiveRecord::Migration[6.0]
  def change
    create_table :blenders do |t|
      t.integer :animal_id
      t.integer :chimera_id

      t.timestamps
    end
  end
end
