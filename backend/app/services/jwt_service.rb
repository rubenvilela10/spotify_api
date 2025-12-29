class JwtService
  SECRET = Rails.application.credentials.jwt_secret || ENV['JWT_SECRET']

  # payload = { user_id: ..., spotify_id: ... }
  def self.encode(payload, exp_seconds: 24*3600)
    payload[:exp] = Time.now.to_i + exp_seconds
    JWT.encode(payload, SECRET, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET, true, { algorithm: 'HS256' })
    decoded.first.with_indifferent_access
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end
end