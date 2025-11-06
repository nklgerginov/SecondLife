# config/initializers/supabase.rb

require 'supabase-ruby'

SUPABASE_URL = ENV['SUPABASE_URL'] || 'https://wfabfqlakikosamvnawa.supabase.co'
SUPABASE_KEY = ENV['SUPABASE_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYWJmcWxha2lrb3NhbXZuYXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NjM2OTMsImV4cCI6MjA3ODAzOTY5M30.-XADXF6gpNf3t8ORk616SfdINQgzUYPp9RV_fkrN-uw'

Supabase.configure do |config|
  config.api_url = SUPABASE_URL
  config.api_key = SUPABASE_KEY
  config.headers = { 'Content-Type' => 'application/json' }
end

SUPABASE_CLIENT = Supabase::Client.new
