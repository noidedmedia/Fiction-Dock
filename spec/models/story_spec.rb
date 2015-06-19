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
#  license     :integer          default(0), not null
#  language    :integer          default(0), not null
#

require 'rails_helper'

RSpec.describe Story, type: :model do
  it { should define_enum_for(:content_rating)}
  it { should validate_presence_of(:content_rating)}
  describe "content ratings" do
    let(:adult){FactoryGirl.create(:story,
                                   content_rating: :adult)}
    let(:everybody){FactoryGirl.create(:story,
                                       content_rating: :everybody)}
    let(:teen){FactoryGirl.create(:story,
                                  content_rating: :teen)}
    it "lets teen and adult stories through by default" do
      adult
      everybody
      teen
      Story.for_content.each do |story|
        expect(["everybody", "teen"]).to include(story.content_rating)
      end
    end
  end
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
      inc = FactoryGirl.create(:franchise_with_characters)
      notinc = FactoryGirl.create(:franchise_with_characters)
      s = FactoryGirl.create(:story)
      s.franchises << inc
      s.characters << notinc.characters.first
      expect(s.characters).to include(notinc.characters.first)
      expect(s.franchises).to include(inc)
      expect(s).to_not be_valid
    end
  end
end
