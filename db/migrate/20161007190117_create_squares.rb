class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.integer :track
      t.timestamps
    end
  end
end
