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

    headers = { "Authorization" => "Bearer #{tokens['access_token']}"}
    profile = HTTParty.get('https://api.spotify.com/v1/me', headers: headers).parsed_response


    # find or create user
    user = User.find_or_create_by(spotify_id: profile['id'])
    user.update!(
      name: profile['display_name'],
      email: profile['email'],
      access_token: profile['access_token'],
      refresh_token: profile['refresh_token'],
      token_expires_at: Time.now + tokens['expires_in'].to_i.seconds
    )

    render json: { user: user, tokens: tokens }
  end


end