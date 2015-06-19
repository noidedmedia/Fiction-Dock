RSpec.describe RatingResolver do
  context "with content ratings" do
    before(:all) do
      @everybody = FactoryGirl.create(:story,
                                      content_rating: :everybody)
      @teen = FactoryGirl.create(:story,
                                 content_rating: :teen)
      @adult = FactoryGirl.create(:story,
                                  content_rating: :adult)
    end
    it "resolves adult" do
      r = RatingResolver.new({
        "adult" => "true"
      }).resolve 
      r.each do |story|
        expect(story.content_rating).to eq("adult")
      end
    end
    it "resolves teen" do
      r = RatingResolver.new({
        "teen" => "true"
      }).resolve
      r.each do |story|
        expect(story.content_rating).to eq("teen")
      end
    end
    it "resolves everybody" do
      r = RatingResolver.new({
        "everybody" => "true"
      }).resolve
      r.each do |story|
        expect(story.content_rating).to eq("everybody")
      end
    end
    it "resolves with multiple ratings" do
      r = RatingResolver.new({
        "everybody" => "true",
        "teen" => "true"
      }).resolve
      r.each do |story|
        expect(["everybody", "teen"]).to include(story.content_rating)
      end
    end
  end
end
