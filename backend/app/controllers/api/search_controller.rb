class Api::SearchController < ApplicationController
  before_action :authenticate_user!

  def index
    return render json: { error: 'Missing query' }, status: :bad_request if params[:q].blank?

    spotify = SpotifyService.new(current_user)

    results = spotify.get('/search', {
      q: params[:q],
      type: params[:type] || 'track,artist,album',
      limit: 10
    })

    render json: results
  end
end