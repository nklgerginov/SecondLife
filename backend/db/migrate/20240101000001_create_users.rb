class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :supabase_id, null: false, index: { unique: true }
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end

