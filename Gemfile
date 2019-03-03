source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.3'

gem 'active_model_serializers'
gem 'rails', '~> 5.2.1'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'webpacker', '~> 3.5.5'
gem 'jbuilder', '~> 2.5'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'devise', '~> 4.5.0'
gem 'devise-jwt', '~> 0.5.8'
gem 'responders'
gem 'cancancan', '~> 2.0'
gem 'ransack', github: 'activerecord-hackery/ransack'

group :development, :test do
  gem 'rspec-rails', '~> 3.8'
  gem 'factory_bot_rails', '~> 4.0'
end

group :test do
  gem 'shoulda-matchers', '4.0.0.rc1'
  gem 'rails-controller-testing'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
