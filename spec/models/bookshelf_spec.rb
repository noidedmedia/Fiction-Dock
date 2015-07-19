# == Schema Information
#
# Table name: bookshelves
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Bookshelf, type: :model do
  it{should validate_presence_of(:name)}
  it{should validate_presence_of(:description)}
  it{should validate_presence_of(:user)}

end
