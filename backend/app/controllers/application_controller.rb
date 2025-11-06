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

    begin
      # Verify token with Supabase
      response = SUPABASE_CLIENT.auth.get_user(token)
      if response.user
        @current_supabase_user = response.user
        @current_user = User.find_by(supabase_id: @current_supabase_user.id)
        unless @current_user
          render json: { error: 'User not found in local database' }, status: :unauthorized
        end
      else
        render json: { error: 'Invalid or expired token' }, status: :unauthorized
      end
    rescue Supabase::Gotrue::APIError => e
      render json: { error: "Supabase authentication failed: #{e.message}" }, status: :unauthorized
    rescue StandardError => e
      render json: { error: "Authentication error: #{e.message}" }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end

  def current_supabase_user
    @current_supabase_user
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

