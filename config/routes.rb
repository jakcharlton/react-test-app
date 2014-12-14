Rails.application.routes.draw do
  root 'pages#index'

  resources :comments


  get "*path" => "pages#index"

end
