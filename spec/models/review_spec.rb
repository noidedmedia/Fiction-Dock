require 'rails_helper'

RSpec.describe Review, type: :model do
  it{should validate_presence_of :user}
  it{should validate_presence_of :story}
  it{should validate_presence_of :name}
  it{should validate_presence_of :body}
  it{should validate_length_of(:body).is_at_least(600)}
end
