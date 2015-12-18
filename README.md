Fiction Dock [ ![Codeship Status for noidedmedia/Fiction-Dock](https://codeship.com/projects/6aaaf110-f1c6-0132-77aa-52b2bfb2ddb1/status?branch=master)](https://codeship.com/projects/84989)
========

![Fiction Dock Logo](http://i.imgur.com/vFNLbd7.png)


## Development FAQ

### Setting up your Development environment

This tutorial assumes you have some basic understanding of using the Terminal and Git/GitHub. You don't need to be able to hack the Pentagon, but you should know what `cd` and `ls` do, how to make a branch, and how to submit a pull request on GitHub.

If you don't, check out [Codecademy's Command Line course](https://www.codecademy.com/courses/learn-the-command-line) and GitHub's [Git tutorial](https://help.github.com/articles/set-up-git/) before getting started.

#### OS X
1. Install the Xcode command-line tools with `xcode-select –install`. This'll be necessary to install Homebrew.
2. Install [Homebrew](http://brew.sh/) with the following command: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`.
3. Install [RVM](https://rvm.io/).
4. Use RVM to install Ruby 2.2.4 (`rvm install ruby-2.2.4`) and then switch to that version of Ruby with `rvm use ruby-2.2.4 --default`.
5. Install [Git](https://git-scm.com/) with `brew install git`, then either use Git from the terminal or [the GitHub Desktop app](https://desktop.github.com/) to pull down the Fiction-Dock repository.
6. Install PostgreSQL 9.4 with `brew install postgresql`. We also recommend using [Postgres.app](http://postgresapp.com/) on OS X to get the Postgres server running after the initial setup.
8. Install [Bundler](http://bundler.io/) with `gem install bundler`.
9. In the Fiction-Dock directory (wherever you installed the Git repository), run `bundle install` to install all the relevant gems you'll need for developing Fiction-Dock. This might take a bit of time, be patient!
10. Run `rake db:setup` to set up the Postgres development server.
11. If everything has gone right so far, you'll be able to start up a Rails server with `rails s`! You can navigate to the URL printed in the Terminal (by default, [http://localhost:3000](http://localhost:3000)) in your browser to test your local version of Fiction-Dock.
12. Get working!

You can update packages installed with Homebrew at any time with `brew update` and `brew upgrade`. You'll likely want to do this once a week, just in case there are security issues in anything you've installed. We recommend using Homebrew as much as possible to install development dependencies, as it makes uninstalling and updating things much easier!

#### Linux
Note: Replace `apt-get install` with your distro's equivalent package manager, this uses `apt-get` for simplicity's sake.

1. Install [RVM](https://rvm.io/).
2. Use RVM to install Ruby 2.2.4 (`rvm install ruby-2.2.4`) and then switch to that version of Ruby with `rvm use ruby-2.2.4 --default`.
3. Install [Git](https://git-scm.com/) if you need to, then use git from the terminal to pull down the Fiction-Dock repository.
4. Install PostgreSQL 9.4 with `apt-get install postgresql`.
5. Install [Bundler](http://bundler.io/) with `gem install bundler`.
6. In the Fiction-Dock directory (wherever you installed the Git repository), run `bundle install` to install all the relevant gems you'll need for developing Fiction-Dock. This might take a bit of time, be patient!
7. Run `rake db:setup` to set up the Postgres development server.
8. If everything has gone right so far, you'll be able to start up a Rails server with `rails s`! You can navigate to the URL printed in the Terminal (by default, [http://localhost:3000](http://localhost:3000)) in your browser to test your local version of Fiction-Dock.
9. Get working!


### How do I make myself an admin on my local build?

1. Navigate to your local copy of Fiction-Dock in the Terminal.
2. `rails c`
3. `u = User.where(name: "YOUR NAME").first`
4. `u.level = :admin`
5. `u.save!`
6. `quit`


### How do I generate the icon font after adding a new icon?

Icon font auto-generation technique courtesy of Scott Nelson's post [here](http://thisbythem.com/blog/rails-custom-font-icons/).

1. Assuming you have Homebrew installed on OS X, run `brew install fontforge ttfautohint` from the terminal.
  * If you want to install the prerequisites to FontCustom using other means, you can see the installation instructions in the [FontCustom README](https://github.com/FontCustom/fontcustom/#installation).
2. Add icons as `.svg` files to `app/assets/icons`.
3. From the terminal, in the base Fiction-Dock directory, run `rake icons:compile`.
4. The new icon font should be generated and immediately useable, you can add the new icon to the site by using the auto-generated CSS classes. For example, if we take an SVG named `heart.svg`, the css class will be `icon-heart`.

#### Notes:

* These instructions are for OS X, Linux users should be able to do this as well with some messing about, Windows users... sorry.

* Be aware that any icons you add to this repository in the `app/assets/icons` folder can and will subsequently be included in our icon font, which is licensed under the [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL). As such, you're giving up certain protections of icons you've created. If you didn't create the icons, you shouldn't try to include them in this project.

## License

Fiction Dock is released under the [GNU Affero General Public License](http://opensource.org/licenses/AGPL-3.0).
All branding material is copyright 2015 Noided Media LLC. All rights reserved.
