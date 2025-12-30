class Api::HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    spotify = SpotifyService.new(current_user)

    artists_response = spotify.get('/me/top/artists', limit: 5)
    tracks_response  = spotify.get('/me/top/tracks', limit: 5)
    albums_response  = spotify.get('/me/albums', limit: 10)

    render json: {
      user: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email,
        spotify_id: current_user.spotify_id,
        avatar: current_user.avatar
      },
      top_artists: artists_response['items'] || [],
      top_tracks: tracks_response['items'] || [],
      top_albums: albums_response['items'] || [],
    }
  end
end