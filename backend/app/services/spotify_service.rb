class SpotifyService
  BASE_URL = "https://api.spotify.com/v1"

  def initialize(user)
    @user = user
  end

  def get(path, params = {})
    uri = URI("#{BASE_URL}#{path}")
    uri.query = URI.encode_www_form(params) if params.any?

    response = Net::HTTP.start(
      uri.host,
      uri.port,
      use_ssl: true,
      verify_mode: OpenSSL::SSL::VERIFY_NONE # apenas dev
    ) do |http|
      request = Net::HTTP::Get.new(uri)
      request['Authorization'] = "Bearer #{@user.access_token}"
      http.request(request)
    end

    return JSON.parse(response.body) if response.code.to_i == 200

    Rails.logger.error("Spotify API error #{response.code}: #{response.body}")
    {}
  end
end