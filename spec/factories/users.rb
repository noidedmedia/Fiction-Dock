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

FactoryGirl.define do
  factory :user do
    sequence(:name){|n| "Person_#{n}_#{rand.to_s[2..8]}"}
    sequence(:email){|n| "person#{n}@#{rand.to_s[2..8]}example.com"}
    password { Faker::Internet.password(8) }
  end

end
