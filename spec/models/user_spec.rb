require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validation" do
    it{ should_not allow_value("I am a name with spaces").for(:name) }
    it{ should define_enum_for(:level) }
    it{ should allow_value("i_am_underscore_name", "BobbyJones").for(:name)}
    it{ should validate_uniqness_of(:name)}`
  end
end
