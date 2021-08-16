FirebaseIdToken.configure do |config|
  config.redis = Redis.new
  config.project_ids = ['fir-auth-front']
end