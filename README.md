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


### How do I generate the icon font after adding a new icon?

Icon font auto-generation technique courtesy of Scott Nelson's post [here](http://thisbythem.com/blog/rails-custom-font-icons/).

1. Assuming you have Homebrew installed on OS X, run `brew install fontforge ttfautohint` from the terminal.
  * If you want to install the prerequisites to FontCustom using other means, you can see the installation instructions in the [FontCustom README](https://github.com/FontCustom/fontcustom/#installation).
2. Add icons as `.svg` files to `app/assets/icons`.
3. From the terminal, in the base Fiction-Dock directory, run `rake icons:compile`.
4. The new icon font should be generated and immediately useable, you can add the new icon to the site by using the auto-generated CSS classes. For example, if we take an SVG named `heart.svg`, the css class will be `icon-heart`.

#### Notes:

These instructions are for OS X, Linux users should be able to do this as well with some messing about, Windows users... sorry.

Be aware that any icons you add to this repository in the `app/assets/icons` folder can and will subsequently be included in our icon font, which is licensed under the [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL). As such, you're giving up certain protections of icons you've created. If you didn't create the icons, you shouldn't try to include them in this project.
