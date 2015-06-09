# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  blurb       :string
#  user_id     :integer
#  published   :boolean          default(FALSE), not null
#

require 'rails_helper'

RSpec.describe Story, type: :model do
  describe "validation" do
    it "requires at least one character" do
      s = FactoryGirl.build(:story)
      s.characters = []
      expect(s).to_not be_valid
    end
    it "requires at least one franchise" do
      s = FactoryGirl.build(:story)
      s.franchises = []
      expect(s).to_not be_valid
    end
    # TODO: name this something better
    it "requires all characters be from a franchise it has" do
      s = FactoryGirl.build(:story)
      f = FactoryGirl.build(:franchise_with_characters)
      s.characters = [f.characters.first]
      expect(s).to_not be_valid
    end
  end
end
