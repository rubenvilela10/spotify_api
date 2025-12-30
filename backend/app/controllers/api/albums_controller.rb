class Api::AlbumsController < ApplicationController
  before_action :authenticate_user!

  def show
    album_id = params[:id]
    return render json: { error: 'Missing album id' }, status: :bad_request if album_id.blank?

    spotify = SpotifyService.new(current_user)

    album = spotify.get("/albums/#{album_id}")

    if album.present? 
      render json: album
    else
      render json: { error: "Album not found" }, status: :not_found
    end
  end
end