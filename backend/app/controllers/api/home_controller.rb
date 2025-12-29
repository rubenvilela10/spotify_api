class Api::HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    artists_uri = URI("https://api.spotify.com/v1/me/top/artists?limit=5")
    artists_response = Net::HTTP.start(artists_uri.host, artists_uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      request = Net::HTTP::Get.new(artists_uri)
      request['Authorization'] = "Bearer #{current_user.access_token}"
      http.request(request)
    end

    artists = JSON.parse(artists_response.body)['items']


    tracks_uri= URI("https://api.spotify.com/v1/me/top/tracks?limit=5")
    tracks_response = Net::HTTP.start(tracks_uri.host, tracks_uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      request = Net::HTTP::Get.new(tracks_uri)
      request['Authorization'] = "Bearer #{current_user.access_token}"
      http.request(request)
    end

    tracks = JSON.parse(tracks_response.body)['items']


    render json: {user: current_user, top_artists: artists, top_tracks:tracks}
  end
end