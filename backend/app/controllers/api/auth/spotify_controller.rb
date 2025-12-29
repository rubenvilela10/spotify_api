class Api::Auth::SpotifyController < ApplicationController
  require 'net/http'
  require 'uri'
  require 'json'

  def redirect
    query = {
      response_type: 'code',
      client_id: ENV['SPOTIFY_CLIENT_ID'],
      scope: 'user-read-email user-read-private', # permissions
      redirect_uri: ENV['SPOTIFY_REDIRECT_URI']
    }.to_query

    redirect_to "https://accounts.spotify.com/authorize?#{query}", allow_other_host: true
  end

  def callback
    code = request.query_parameters['code']

    if code.nil?
      render json: { error: "No code param received from Spotify" }, status: :bad_request
      return
    end

    uri = URI('https://accounts.spotify.com/api/token')
    params = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: ENV['SPOTIFY_REDIRECT_URI'],
      client_id: ENV['SPOTIFY_CLIENT_ID'],
      client_secret: ENV['SPOTIFY_CLIENT_SECRET']
    }

    # POST to Spotify get tokens
    # OpenSSL::SSL::SSLError -> deactivated because it is not mandatory on a local project
    response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      request = Net::HTTP::Post.new(uri)
      request.set_form_data(params)
      http.request(request)
    end

    tokens = JSON.parse(response.body)

    unless tokens['access_token']
      render json: { error: "Spotify token request failed", body: tokens }, status: :bad_request
      return
    end

    access_token = tokens['access_token']
    refresh_token = tokens['refresh_token']

    # search user profile
    profile_uri = URI('https://api.spotify.com/v1/me')
    profile_response = Net::HTTP.start(profile_uri.host, profile_uri.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) do |http|
      request = Net::HTTP::Get.new(profile_uri)
      request['Authorization'] = "Bearer #{access_token}"
      http.request(request)
    end

    profile = JSON.parse(profile_response.body)

    # find or create user
    user = User.find_or_initialize_by(spotify_id: profile['id'])
    user.update(
      name: profile['display_name'],
      email: profile['email'],
      access_token: access_token,
      refresh_token: refresh_token,
      token_expires_at: Time.now + tokens['expires_in'].to_i.seconds
    )

    jwt = JwtService.encode({
      user_id: user.id,
      spotify_id: user.spotify_id
    })
    
    frontend_url = ENV.fetch('FRONTEND_URL', 'http://localhost:5173')
    
    redirect_to "#{frontend_url}/auth/callback?token=#{jwt}",
      allow_other_host: true
  end
end