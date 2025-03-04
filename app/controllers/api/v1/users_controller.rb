# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def index
        users = User.select(:id, :name)
        render status: :ok, json: { users: users }
      end
    end
  end
end
