FactoryGirl.factories.map(&:name).each do |factory_name|
  RSpec.describe "the #{factory_name} factory" do
    it "is valid" do
      expect(FactoryGirl.create(factory_name)).to be_valid
    end
  end
end
