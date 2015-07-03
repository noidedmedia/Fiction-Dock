require 'rails_helper'

RSpec.describe Review, type: :model do
  it{should valdiate_presence_of :user}
  it{should validate_presence_of :story}
  it{should validate_presence_of :title}
  it{should validate_presence_of :body}
  it{should validate_lenght_of(:body).is_at_least(600)}
end
