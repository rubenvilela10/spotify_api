class ApplicationController < ActionController::API
  attr_reader :current_user

  protected

  def authenticate_user!
    header = request.headers['Authorization']
    Rails.logger.info "AUTH HEADER: #{header.inspect}"
    token = header&.split(' ')&.last
    Rails.logger.info "TOKEN: #{token.inspect}"
  
    payload = JwtService.decode(token)
    Rails.logger.info "PAYLOAD: #{payload.inspect}"
  
    return render_unauthorized unless payload
    @current_user = User.find_by(id: payload[:user_id])
    return render_unauthorized unless @current_user
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
