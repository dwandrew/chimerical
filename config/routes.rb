Rails.application.routes.draw do
  resources :sizes
  resources :habitats
  resources :blenders
  resources :chimeras
  get '/randomAnimal' => 'animals#random'
  resources :animals
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
