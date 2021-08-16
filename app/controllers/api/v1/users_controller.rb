module Api
  module V1
    class UsersController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        create_user(@auth, user_params)
      end

      include UpdateUserConcern
      def update
        update_user(@auth)
      end

      private
        def set_auth
          @auth = authenticate_token_by_firebase
        end

        def user_params
          params.require(:user).permit(:email)
        end
    end
  end
end
