class Api::ArtistsController < ApplicationController
  before_action :authenticate_user!

  def show
    artist_id = params[:id]
    return render json: { error: 'Missing artist id' }, status: :bad_request if artist_id.blank?

    spotify = SpotifyService.new(current_user)

    artist = spotify.get("/artists/#{artist_id}")
    top_tracks = spotify.get("/artists/#{artist_id}/top-tracks?market=PT")
    top_albums = spotify.get("/artists/#{artist_id}/albums?limit=10")

    Rails.logger.info(top_albums.inspect)

    render json: {
      artist: artist,
      top_tracks: top_tracks['tracks'],
      top_albums: top_albums['items']
    }
  end
end