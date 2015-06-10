RSpec.describe "Factories" do

  FactoryGirl.factories.map(&:name).each do |factory_name|
    describe "the #{factory_name} factory" do
      it "is valid" do
        factory = FactoryGirl.create(factory_name)
        expect(factory).to be_valid
      end
    end
  end
end
