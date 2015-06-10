require 'rails_helper'

RSpec.describe CharactersController, type: :controller do
  it do 
    should permit(:name, :description)
      .for(:create)
      .on(:character)
  end


  
end
