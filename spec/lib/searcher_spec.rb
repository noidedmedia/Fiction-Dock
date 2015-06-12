require 'rails_helper'

RSpec.describe Searcher do
  it "finds via ships" do
    desired = FactoryGirl.create(:story)
    not_desired = FactoryGirl.create(:story)
    ship = FactoryGirl.create(:ship, story: desired)
    hs = { "ships" => [
      ship.characters.pluck(:id).join(", ")
    ]}
    searcher = Searcher.new(hs)
    expect(searcher.resolve).to eq([desired])
  end
end
