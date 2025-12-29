# app/controllers/api/home_controller.rb
class Api::HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    # GET top artists
    artists = fetch_spotify_data("https://api.spotify.com/v1/me/top/artists?limit=5")
    # GET top tracks
    tracks = fetch_spotify_data("https://api.spotify.com/v1/me/top/tracks?limit=5")

    render json: {
      user: {
        id: current_user.id,
        name: current_user.name,
        email: current_user.email,
        spotify_id: current_user.spotify_id
      },
      top_artists: artists,
      top_tracks: tracks
    }
  end

  private

  def fetch_spotify_data(url)
    uri = URI(url)
    response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      req = Net::HTTP::Get.new(uri)
      req['Authorization'] = "Bearer #{current_user.access_token}"
      http.request(req)
    end

    if response.code.to_i == 200
      JSON.parse(response.body)['items'] || []
    else
      Rails.logger.error("Spotify API error #{response.code}: #{response.body}")
      []
    end
  rescue StandardError => e
    Rails.logger.error("Spotify request failed: #{e.message}")
    []
  end
end