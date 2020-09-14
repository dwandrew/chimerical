class AddSizeIdToChimeras < ActiveRecord::Migration[6.0]
  def change
    add_column :chimeras, :size_id, :integer
  end
end
