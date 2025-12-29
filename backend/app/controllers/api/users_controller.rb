class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    render json: {
      id: current_user.id,
      name: current_user.name,
      email: current_user.email,
      spotify_id: current_user.spotify_id
    }
  end
end