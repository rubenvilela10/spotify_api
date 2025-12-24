class Api::Auth::SpotifyController < ApplicationController
  require 'net/http'

  def redirect
    query = {
      response_type: 'code',
      client_id: ENV['SPOTIFY_CLIENT_ID'],
      redirect_uri: ENV['SPOTIFY_REDIRECT_URI']
    }

    redirect_to "https://accounts.spotify.com/authorize?#{query}"
  end

  def callback
    response = Net::HTTP.post_form(
      URI('https://accounts.spotify.com/api/token'),
      {
        grant_type: 'authorization_code',
        code: params[:code],
        redirect_uri: ENV['SPOTIFY_REDIRECT_URI'],
        client_id: ENV['SPOTIFY_CLIENT_ID'],
        client_secret: ENV['SPOTIFY_CLIENT_SECRET']
      }
    )

    tokens = JSON.parse(response.body)

    render json: tokens
  end


end