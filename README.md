Fiction Dock [ ![Codeship Status for noidedmedia/Fiction-Dock](https://codeship.com/projects/6aaaf110-f1c6-0132-77aa-52b2bfb2ddb1/status?branch=master)](https://codeship.com/projects/84989)
========

![Fiction Dock Logo](http://i.imgur.com/vFNLbd7.png)


## Development FAQ
### How do I make myself an admin on my local build?

1. Navigate to your local copy of Fiction-Dock in the Terminal.
2. `rails c`
3. `u = User.where(name: "YOUR NAME").first`
4. `u.level = :admin`
5. `u.save!`
6. `quit`
