/* Create New Story/Edit Story JavaScript
 * Page is highly dynamic, so we went with using React.js for this.
 * If you can't figure out where a property is coming from, it may have been passed
 * by the react_component helper used by the react-rails gem.
 */
// ReactFormElements component used in the Rails view.
var StoryForm = React.createClass({
  propTypes: {
    franchises: React.PropTypes.arrayOf(React.PropTypes.object),
    characters: React.PropTypes.arrayOf(React.PropTypes.object),
    ships: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  getInitialState: function() {
    // "Global" values for the franchises, characters, and ships
    // passed when submitting the story.
    return {
      franchises: this.props.franchises,
      characters: this.props.characters,
      ships: this.props.ships
    };
  },
  submit: function(e) {
    e.preventDefault();
    var Story = {};
    var storyid = $("#story-form").data("story-id");
    Story.name = $("#story-name-field").val();
    Story.language = $("#story-language-select").val();
    Story.license = $("#story-license-select").val();
    Story.content_rating = $("#story-rating-select").val();
    Story.blurb = $("#story-blurb-field").val();
    Story.description = $("#story-description-field").val();

    // An array is created out of the franchises passed from parent components
    // and then made a property of the Story object.
    Story.franchise_ids = this.state.franchises.map(function(franchise) {
      return franchise.id;
    });

    // Ditto above, albeit with characters instead of franchises.
    Story.character_ids = this.state.characters.map(function(character) {
      return character.id;
    });
    Story.ship_attrs = this.state.ships.map(function(ship) {
      var ids = ship.characters.map(function(c){
        console.log("Mapping character:",c);
        return c.id;
      });
      console.log("ids is",ids);
      return {
        character_ids: ids
      };
    }.bind(this));
    console.log("Children:",this.props.children);
    // Rails expects the story to be wrapped in a story label 
    Story = {story: Story};
    // Use a PUT if the story exists
    var method = storyid ? "PUT" : "POST";
    console.log("Submitting story:",Story);
    $.ajax("/stories/" + storyid, {
      dataType: "json",
      data: JSON.stringify(Story),
      contentType: "application/json; encoding=utf-8",
      method: method,
      success: function(data){
        console.log("Returned successful submit:",data);
        window.location.href = "/stories/" + data.id;
      },
      error: function(error){
        console.warn("Story form submission errored");
        this.setState({
          error: JSON.parse(error.responseText)
        });
      }.bind(this)
    });
  },
  addFranchise: function(franchise) {
    var f = this.state.franchises;
    // check if it's there already, return if so
    for (var fr in this.state.franchises) {
      if (this.state.franchises[fr].id === franchise.id) {
        return;
      }
    }
    f.push(franchise);
    this.setState({
      franchises: f
    });
  },
  removeFranchise: function(franchise) {
    /*
     * Grab an array of franchises with the franchise we want to remove removed
     * We update the franchises to be equal to this later
     */
    console.log("removing franchise:",franchise);
    var rem = this.state.franchises.filter(function(f) {
      console.log("checking",f,"against",franchise);
      var k = franchise.id !== f.id;
      console.log(k ? "keeping this" : "removing this");
      return k;
    });
    this.setState({
      franchises: rem,
      characters: this.state.characters.filter(function(c) {
        return c.franchise_id !== franchise.id;
      }),
      ships: this.state.ships.map(function(s){
        return {
          characters: s.characters.filter(function(c){
            return c.franchise_id !== franchise.id;
          })
        };
      })
    });
  },
  // Adds a character to the characters state.
  addCharacter: function(character) {
    var characters = this.state.characters;
    characters.push(character);
    console.log(characters);
    // Passes the updated characters array to the characters state.
    this.setState({ characters: characters });
  },
  // Removes a character from the characters state.
  removeCharacter: function(character) {
    // Creates a new array out of the characters state
    // without the character we're removing.
    var characters = this.state.characters.filter(function(c) {
      return character.id !== c.id;
    });
    // Remove the removed character from our ships
    var ships = this.state.ships;
    for (var i in ships) {
      c = ships[i].characters.filter(function(ch) {
        if (character.id === ch.id) {
          return false;
        }
        return true;
      });
      ships[i].characters = c;
    }
    this.setState({
      characters: characters,
      ships: ships
    });
  },
  addShip: function(e) {
    e.preventDefault();
    var s = this.state.ships;
    s.push({
      characters: []
    });
    this.setState({
      ships: s 
    });
  },
  removeShip: function(index) {
    var s = this.state.ships;
    delete s[index];
    this.setState({
      ships: s
    });
  },
  changeShipCharacters: function(index, characters){
    var s = this.state.ships;
    console.log("Changing the ship characters for ship:",s[index]);
    s[index].characters = characters;
    console.log("After change:",s[index]);
    this.setState({
      ships: s
    });
  },
  render: function() {
    // All properties passed from the Rails helper are forwarded onto
    // the Franchises component by the {...this.props} line.
    return (
      <div>
        <div className="section-header">{this.props.translations.franchises_label}</div>

        <ul className="franchise-list">
          {/* The franchises property must be declared after the {...this.props}
              to prevent the franchises from being overridden by the franchises
              property forwarded from the Rails helper. */}
          {this.state.franchises.map(function(f) {
            var active_characters = this.state.characters.filter(function(c) {
              return c.franchise_id === f.id;
            });
            var inactive_characters = f.characters.filter(function(c) {
              // Take all characters from active_characters with an id that
              // matchies this character's id. If we get none, the character 
              // is not active, and, thus, inactive.
              return active_characters.filter(function(ch) {
                return ch.id === c.id;
              }).length === 0;
            });
            return <FormFranchise key={f.name} active_characters={active_characters} inactive_characters={inactive_characters} removeCharacter={this.removeCharacter} addCharacter={this.addCharacter} {...f} removeFranchise={this.removeFranchise} translations={this.props.translations} />;
          }.bind(this))}

          <FranchiseAdder onAdd={this.addFranchise} translations={this.props.translations} />
        </ul>

        <ul className="ship-list">
          <div className="section-header">{this.props.translations.ships_label}</div>
          
          {this.state.ships.map(function(ship, i) {
            return <FormShip {...ship} potential_characters={this.state.characters} key={i} onRemove={this.removeShip} reactKey={i} translations={this.props.translations}  onCharacterChange={this.changeShipCharacters} />;
          }.bind(this))}
          
          <AddShipButton addShip={this.addShip} translations={this.props.translations} />
        </ul>

        <input type="submit" value={this.props.translations.submit} id="story-form-submit" onClick={this.submit} />
      </div>
    );
  }
});
