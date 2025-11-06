module V1
  module Ror
    class HealthController < ApplicationController
      def check
        render json: { status: 'ok', message: 'SecondLife API is running' }
      end
    end
  end
end

