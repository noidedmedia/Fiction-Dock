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
      expect(RatingResolver.new({
        "adult" => "true"
      }).resolve).to contain_exactly(@adult)
    end
    it "resolves teen" do
      expect(RatingResolver.new({
        "teen" => "true"
      }).resolve).to contain_exactly(@teen)
    end
    it "resolves everybody" do
      expect(RatingResolver.new({
        "everybody" => "true"
      })).to contain_exactly(@everybody)
    end
    it "resolves with multiple ratings" do
      expect(RatingResolver.new({
        "everybody" => "true",
        "teen" => "true"
      })).to contain_exactly(@everybody, @teen)
    end
  end
end
