Fiction Dock [ ![Codeship Status for noidedmedia/Fiction-Dock](https://codeship.com/projects/6aaaf110-f1c6-0132-77aa-52b2bfb2ddb1/status?branch=master)](https://codeship.com/projects/84989)
========

![Fiction Dock Logo](http://i.imgur.com/vFNLbd7.png)


## Development FAQ

### How do I set this up?

This tutorial assumes you have some basic understanding of using the Terminal and Git/GitHub. You don't need to be able to hack the Pentagon, but you should know what `cd` and `ls` do, how to make a branch, and how to submit a pull request on GitHub.

If you don't, check out [Codecademy's Command Line lessons](https://www.codecademy.com/courses/learn-the-command-line) and GitHub's [Git tutorial](https://help.github.com/articles/set-up-git/) before getting started.

1. Use Git from the terminal, or [the GitHub Desktop app](https://desktop.github.com/) to pull down the Fiction-Dock repository.
2. Install [RVM](https://rvm.io/) and use it to download Ruby 2.2.2.
3. Install Bundler (`gem install bundler`).
4. Use your package manager to install PostgreSQL 9.4.
  * **OS X**: If you're using [Homebrew](http://brew.sh/) (which we recommend), enter the following into the Terminal to install Postgres: `brew install postgresql`. We also recommend using [Postgres.app](http://postgresapp.com/) on OS X to get the Postgres server running after the initial setup.
  * **Linux**: Run `apt-get install postgresql` or your distro's equivalent in the Terminal.
5. Navigate to the Fiction-Dock directory you pulled down from GitHub.
6. Once in the directory, run `bundle install`.
  * After that, you may also want to run `gem install rspec`. Bundler _should_ do this, but sometimes it doesn't.
7. Make sure you have your Postgres server running, then run `rails s` to start a local Rails development server. You can navigate to the URL printed in the Terminal (by default, http://localhost:3000) in your browser to test your local version of Fiction-Dock.
  * Note that some changes you make may require restarting the server before changes are applied, but most HTML/CSS/JavaScript changes will be visible by just reloading the page in your browser.
9. Start contributing!


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
