class Api::TracksController < ApplicationController
  before_action :authenticate_user!

  def show
    track_id = params[:id]
    return render json: { error: 'Missing track id' }, status: :bad_request if track_id.blank?

    spotify = SpotifyService.new(current_user)

    track = spotify.get("/tracks/#{track_id}")

    if track.present? 
      render json: track
    else
      render json: { error: "Track not found" }, status: :not_found
    end
  end
end