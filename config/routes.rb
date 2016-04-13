App::Application.routes.draw do
  root to: 'app#show'
  mount API::Root => '/api'
end
