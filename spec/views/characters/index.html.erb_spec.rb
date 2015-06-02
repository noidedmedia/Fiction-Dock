require 'rails_helper'

RSpec.describe "characters/index", type: :view do
  before(:each) do
    assign(:characters, [
      Character.create!(
        :franchise => nil,
        :name => "Name",
        :description => "MyText"
      ),
      Character.create!(
        :franchise => nil,
        :name => "Name",
        :description => "MyText"
      )
    ])
  end

  it "renders a list of characters" do
    render
    assert_select "tr>td", :text => nil.to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
