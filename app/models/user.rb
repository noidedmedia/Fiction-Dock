class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :stories
  has_many :franchise_users
  has_many :franchises, through: :francise_users
  enum level: [:normal, :mod, :admin]

end
