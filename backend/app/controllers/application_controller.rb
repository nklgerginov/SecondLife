class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  # Handle CORS
  before_action :cors_preflight_check
  after_action :cors_set_access_control_headers

  # Error handling
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  private

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = allowed_origin
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Content-Type, Authorization'
      headers['Access-Control-Max-Age'] = '1728000'
      render text: '', content_type: 'text/plain'
    end
  end

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = allowed_origin
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Content-Type, Authorization'
  end

  def allowed_origin
    ENV['FRONTEND_URL'] || 'http://localhost:3000'
  end

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    if token.blank?
      render json: { error: 'Authentication required' }, status: :unauthorized
      return
    end

    # Verify token with Supabase (in production, you'd call Supabase API)
    # For now, we'll decode JWT to get user info
    begin
      secret = Rails.application.credentials.secret_key_base || ENV['SECRET_KEY_BASE'] || 'development_secret'
      decoded_token = JWT.decode(token, secret, true, { algorithm: 'HS256' })
      user_id = decoded_token[0]['user_id']
      @current_user = User.find_by(id: user_id)
      unless @current_user
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError => e
      render json: { error: 'Invalid or expired token' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def record_not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def record_invalid(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def parameter_missing(exception)
    render json: { error: exception.message }, status: :bad_request
  end
end

