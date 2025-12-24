class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :spotify_id
      t.string :name
      t.string :email
      t.string :access_token
      t.string :refresh_token
      t.datetime :token_expires_at

      t.timestamps
    end
  end
end
