require 'rails_helper'

RSpec.describe "characters/edit", type: :view do
  before(:each) do
    @character = assign(:character, Character.create!(
      :franchise => nil,
      :name => "MyString",
      :description => "MyText"
    ))
  end

  it "renders the edit character form" do
    render

    assert_select "form[action=?][method=?]", character_path(@character), "post" do

      assert_select "input#character_franchise_id[name=?]", "character[franchise_id]"

      assert_select "input#character_name[name=?]", "character[name]"

      assert_select "textarea#character_description[name=?]", "character[description]"
    end
  end
end
