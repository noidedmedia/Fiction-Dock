require 'rails_helper'

RSpec.describe Bookshelf, type: :model do
  it{should validate_presence_of(:name)}
  it{should validate_presence_of(:description)}
  it{should validate_presence_of(:user)}

end
