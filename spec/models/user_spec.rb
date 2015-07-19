# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  level                  :integer          default(0), not null
#  slug                   :string
#  content_pref           :jsonb
#

require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validation" do
    it{ should_not allow_value("I am a name with spaces").for(:name) }
    it{ should define_enum_for(:level) }
    it{ should allow_value("i_am_underscore_name", "BobbyJones").for(:name)}
    it{ should validate_uniqueness_of(:name)}
  end
end
