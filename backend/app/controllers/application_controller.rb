class ApplicationController < ActionController::API
  attr_reader :current_user

  protected

  def authenticate_user!
    header = request.headers['Authorization']
    token = header&.split(' ')&.last

    payload = JwtService.decode(token)
    return render_unauthorized unless payload

    @current_user = User.find_by(id: payload[:user_id])
    render_unauthorized unless @current_user
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
