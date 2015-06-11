require 'rails_helper'

describe StoryPolicy do

  let(:user) { FactoryGirl.create(:user) }

  subject { described_class }

  permissions ".scope" do
  end

  permissions :show? do

  end

  permissions :create? do
  end

  permissions :update? do
  end

  permissions :edit? do
    it "works if the user owns it" do
      expect(subject).to permit(user, FactoryGirl.create(:story, user: user))
    end
    it "does not work if the user doesn't own it" do
      s = FactoryGirl.create(:story)
      expect(subject).to_not permit(user, s)
    end
  end
  permissions :destroy? do
  end
end
