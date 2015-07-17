// Create New Story/Edit Story JavaScript
// Page is highly dynamic, so we went with using React.js for this.
// 
// Some very helpful links if you're interested in learning React:
// * [React.js Documentation](https://facebook.github.io/react/docs/getting-started.html)
// * [React.js Introduction For People Who Know Just Enough JQuery To Get By](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/)
//
// If you can't figure out where a property is coming from, it may have been passed
// by the react_component helper used in the react-rails gem.
//


// Generic ListItem class
// Used to list the Franchises and Characters items.
// Styles differ between Franchise ListItems and Character ListItems
// because they're placed in different containers.
var ListItem = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.data.name
    };
  },
  // Sends data to parent component depending on what function was sent in the
  // "remove" property for the ListItem component.
  handleDelete: function(e) {
    this.props.remove(this.props.data);
  },
  render: function() {
    return (
      <li>
        <div>
          <span className="icon icon-close" onClick={this.handleDelete}></span>

          {this.state.name}
        </div>
      </li>
    );
  }
});



/* ==============================================
   Franchises
   ============================================== */

// The "Add a new franchise" button
var AddFranchiseButton = React.createClass({
  getInitialState: function() {
    return { 
      showinput: false
    };
  },
  onChange: function(e) {
    this.props.onChange(e.target.value);
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      $(React.findDOMNode(this.refs.franchiseInput)).val("").focus();
    });
  },
  hideInput: function(e) {
    // Make sure that clicking on the close button doesn't cause it to immediately reopen itself.
    this.preventBubbling(e);

    // Hide input, empty input field value.
    this.setState({showinput: false}, function() {
      $(React.findDOMNode(this.refs.franchiseInput)).val("");
    });

    // Remove suggestions.
    this.props.onChange("");
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addFranchise: function(x, e) {
    console.log(e.target.data);

    var franchise = e.target.data;

    // Forward the chosen franchise along to the main React class.
    this.props.addFranchise(franchise);

    // Hide input, remove suggestions
    this.setState({showinput: false});
  },
  render: function() {
    return (
      <li>
        <div ref="addFranchiseButton" id="add-franchise-button" className={this.state.showinput ? "add-new-franchise hidden" : "add-new-franchise shown"} onClick={this.handleClick}>
          <span className="icon icon-plus"></span>
          {this.props.franchise_add}

          <input ref="franchiseInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.onChange} />

          <span className="icon icon-close" onClick={this.hideInput}></span>
        </div>

        <div className={this.props.suggestions.length > 0 ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(franchise, i) {
              return (
                <li key={franchise.id} data={franchise} ref={'franchise' + i} onClick={this.addFranchise.bind(null, franchise)}>{franchise.name}</li>
              );
            }, this)}
          </ul>
        </div>
      </li>
    );
  }
});

// Franchises component
var Franchises = React.createClass({
  getInitialState: function() {
    return {
      franchisequery: "",
      suggestions: [],
      franchises: this.props.franchises,
      characters: this.props.characters,
      ships: this.props.ships
    };
  },
  handleChange: function(query) {
    this.setState({ franchisequery: query });

    var _this = this;

    console.log(query);
    console.log(this.state.franchisequery);

    if (query === "") {
      _this.setState({ suggestions: [] });
    } else {
      $.ajax("/franchises/complete.json?query=" + query, {
        dataType: "json",
        error: function() {
          console.log("ERROR");
        },
        success: function(data) {

          console.log(data);

          var suggestions = [];

          data.map(function(franchise, i) {
            console.log(franchise);
            suggestions.push(franchise);
          });

          console.log("Suggestions:");
          console.log(suggestions);

          _this.setState({ suggestions: suggestions });
        }
      });
    }
  },
  addFranchise: function(franchise) {
    var franchises = this.state.franchises;

    franchises.push(franchise);

    console.log("Franchises:");
    console.log(this.state.franchises);

    console.log("Adding:");
    console.log(franchise);

    this.setState({ franchises: franchises }, function() {
      this.setState({ suggestions: [] });
    }.bind(this));
  },
  removeFranchise: function(franchise) {
    var franchises = this.state.franchises.filter(function(f) {
      return franchise.id !== f.id;
    });

    console.log("Characters:");
    console.log(this.state.characters);

    var characters = this.state.characters.filter(function(c) {
      return franchise.id !== c.franchise_id;
    });

    console.log("Characters2:");
    console.log(characters);

    console.log("Removing:");
    console.log(franchise);

    this.setState({ franchises: franchises });
    this.setState({ characters: characters });
  },
  addCharacter: function(character) {
    var characters = [];

    this.state.characters.map(function(character, i) {
      characters.push(character);
    });

    characters.push(character);

    console.log(characters);

    this.setState({ characters: characters });
  },
  removeCharacter: function(character) {
    var characters = this.state.characters.filter(function(c) {
      return character.id !== c.id;
    });

    console.log(characters);

    this.setState({ characters: characters });
  },
  updateShips: function(ships) {
    // Create an empty array called "newships".
    var newships = [];

    // All the ships already in the React state are pushed to the newships array.
    this.state.ships.map(function(ship, i) {
      newships.push(ship);
    });

    // New ships passed to updateShips are then added to the newships array.
    ships.map(function(ship, i) {
      newships.push(ship);
    });

    // The React state is updated to reflect the newships array we've just created.
    this.setState({ ships: newships });
  },
  render: function() {
    return (
      <div>

        <div className="section-header">{this.props.franchises_label}</div>

        <ul className="franchise-list">

          {this.state.franchises.map(function(franchise, i) {
            var characters = this.state.characters.filter(function(character) {
              return franchise.id == character.franchise_id;
            });
            return (
              <div key={'container' + franchise.id}>
                <ListItem key={franchise.id} data={franchise} ref={'franchise' + i} remove={this.removeFranchise} />
                <Characters key={'franchisecharacters' + i} characters={characters} elementid={this.props.characters_elementid} placeholder={this.props.characters_placeholder} character_add={this.props.character_add} franchise={franchise} addCharacter={this.addCharacter} removeCharacter={this.removeCharacter} />
              </div>
            );
          }, this)}
          
          <AddFranchiseButton query={this.state.franchisequery} franchise_add={this.props.franchise_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.elementid} addFranchise={this.addFranchise} />

        </ul>

        <div className="section-header">{this.props.ships_label}</div>

        <ul className="ship-list">
          <Ships ship_add={this.props.ship_add} updateShips={this.updateShips} characters={this.state.characters} elementid={this.props.ships_elementid} placeholder={this.props.ships_placeholder} />
        </ul>

        <SubmitButton submit={this.props.submit} elementid={this.props.submit_elementid} characters={this.state.characters} franchises={this.state.franchises} />
      </div>
    );
  }
});



/* ==============================================
   Characters
   ============================================== */

// AddCharacterButton component
var AddCharacterButton = React.createClass({
  // The Initial State of the AddCharacterButton React class.
  getInitialState: function() {
    return { 
      showinput: false,
      inputfocus: false
    };
  },
  // When the onChange event is called on the input, handleChange is run.
  // This passes the value of the input element to the parent Characters component.
  handleChange: function(e) {
    this.props.onChange(e.target.value);
  },
  // When the input element fires the onFocus event, the "inputfocus" class is 
  // set to true and the the value of the input element is passed on to the
  // parent Characters component.
  onFocus: function(e) {
    this.setState({inputfocus: true});

    console.log(e.target.value);

    this.props.onChange(e.target.value);
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      $(React.findDOMNode(this.refs.characterInput)).focus();
    });
    var characterinput = React.findDOMNode(this.refs.characterInput);
    console.log(characterinput);
    this.props.onChange(characterinput);
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addCharacter: function(e) {
    console.log(e.target.data);

    // Forward the chosen franchise along to the main React class.
    this.props.addCharacter(e.target.data);
    
    this.setState({showinput: false, inputfocus: false});
    
    $(React.findDOMNode(this.refs.characterInput)).val("");

    console.log("test");

    this.forceUpdate();
  },
  render: function() {
    return (
      <li>
        <div ref="addCharacterButton" id="add-character-button" className={this.state.showinput ? "add-new-character hidden" : "add-new-character shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.character_add}

          <input ref="characterInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.handleChange} onFocus={this.onFocus} />
        </div>

        <div className={this.state.inputfocus ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(character, i) {
              console.log(character);
              return (
                <li key={character.id + "character" + i} data={character} ref={'character' + i} onClick={this.addCharacter}>{character.name}</li>
              );
            }, this)}
          </ul>
        </div>

      </li>
    );
  }
});

// Characters component
var Characters = React.createClass({
  // The Initial State of the Characters React class.
  getInitialState: function() {
    return {
      suggestions: [],
      characters: []
    };
  },
  // If there is a characters property passed to the Characters React class,
  // the characters state is set to be equivalent to that property.
  // Otherwise, nothing happens.
  componentWillMount: function() {
    if (this.props.characters) {
      this.setState({ characters: this.props.characters });
    }
  },
  // Function for removing a character.
  removeCharacter: function(character) {
    // The variable characters is created and set to be equivalent to
    // the React class' "characters" state after the character sent in
    // the removeCharacter function is filtered out.
    var characters = this.state.characters.filter(function(c) {
      return character.id !== c.id;
    });

    console.log("Removing:");
    console.log(character);

    // The characters array is passed up to the characters state for the Characters React class..
    this.setState({characters: characters}, function() {
      this.props.removeCharacter(character);
    });
  },
  // Adds the passed character to the characters state in the React class.
  addCharacter: function(character) {
    console.log(character);

    // Creates an array out of the characters array already in the React class' state,
    // then appends the character we're adding to that array.
    console.log(this.state.characters);
    var characters = this.state.characters;
    characters.push(character);
    console.log(characters);

    // Sets the characters state to be equivalent to the characters array created above.
    // Then sends the new character "upstream" to the main Franchises React class.
    this.setState({characters: characters}, function() {
      this.props.addCharacter(character);
    });

    // Empty suggestions
    this.emptySuggestions();
  },
  // Empties the suggestions array, as the name would suggest.
  emptySuggestions: function() {
    this.setState({ suggestions: [] });
  },
  handleChange: function() {
    var _this = this;
    var franchise = this.props.franchise;

    // Sends an AJAX request to the current franchise's URL.
    // This returns some data about the franchise, most importantly a list of characters.
    $.ajax("/franchises/" + franchise.slug + ".json", {
      dataType: "json",
      success: function(data) {

        // Creates an empty suggestions array for the characters to be pushed into.
        var suggestions = [];

        console.log("Data.characters:");
        console.log(data.characters);

        // The data returned by the AJAX request is then evaluated and the
        // franchise's characters are added to the suggestions array.
        data.characters.map(function(character, i) {
          console.log(character.name);
          suggestions.push(character);
        });

        console.log(suggestions);

        // The suggestions array we've created is then pushed up to the
        // suggestions state in the React class.
        _this.setState({ suggestions: suggestions });

        console.log("Suggestions state:");
        console.log(_this.state.suggestions);
      }
    });
  },
  render: function() {
    if (this.state.characters) {
      return (
        <ul className="character-list">
          {this.state.characters.map(function(character, i) {
            console.log(character);
            return (
              <ListItem key={character.id} data={character} ref={'character' + i} remove={this.removeCharacter} />
            );
          }, this)}

          <AddCharacterButton query={this.state.query} character_add={this.props.character_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.characters_elementid} addCharacter={this.addCharacter} placeholder={this.props.characters_placeholder} franchise_id={this.props.franchise_id} />
        </ul>
      );
    } else {
      return <ul></ul>;
    }
  }
});



/* ==============================================
   Ships
   ============================================== */

var AddShipButton = React.createClass({
  getInitialState: function() {
    return { 
      showinput: false,
      inputfocus: false
    };
  },
  onChange: function(e) {
    this.props.onChange(e.target.value);
  },
  onFocus: function(e) {
    this.setState({inputfocus: true});

    console.log(e.target.value);

    this.props.onChange(e.target.value);
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      $(React.findDOMNode(this.refs.shipInput)).focus();
    });
    var shipinput = React.findDOMNode(this.refs.shipInput);
    console.log(shipinput);
    this.props.onChange(shipinput);
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addShip: function(e) {
    console.log(e.target.data);

    // Forward the chosen franchise along to the main React class.
    this.props.addShip(e.target.data);
    
    this.setState({showinput: false, inputfocus: false});
    
    $(React.findDOMNode(this.refs.shipInput)).val("");
  },
  render: function() {
    return (
      <li>
        <div ref="addShipButton" id="add-ship-button" className={this.state.showinput ? "add-new-ship hidden" : "add-new-ship shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.ship_add}

          <input ref="shipInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.onChange} onFocus={this.onFocus} />
        </div>

        <div className={this.state.inputfocus ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(character, i) {
              console.log(character);
              return (
                <li key={character.id + "character" + i} data={character} ref={'character' + i} onClick={this.addCharacter}>{character.name}</li>
              );
            }, this)}
          </ul>
        </div>

      </li>
    );
  }
});

var Ships = React.createClass({
  getInitialState: function() {
    return {
      suggestions: [],
      ships: []
    };
  },
  componentWillMount: function() {
    if (this.props.ships) {
      this.setState({ ships: this.props.ships });
    } else {
      this.setState({ ships: [] });
    }
  },
  removeShip: function(ship) {
    var ships = this.state.ships.filter(function(s) {
      return ship.id !== s.id;
    });

    console.log("Removing:");
    console.log(ship);

    this.setState({ships: ships});
  },
  addShip: function(ship) {
    console.log(ship);

    console.log(this.state.ships);
    var ships = this.state.ships;
    ships.push(ships);
    console.log(ships);

    this.setState({ships: ships}, function() {
      this.props.updateShips(this.state.ships);
    });
  },
  emptySuggestions: function() {
    this.setState({ suggestions: [] });
  },
  handleChange: function() {

  },
  render: function() {
    if (this.props.characters.length >= 2) {
      return (
        <ul className="ship-list">
          {this.state.ships.map(function(ship, i) {
            console.log(ship);
            return (
              <ListItem key={'ship' + i} data={ship} remove={this.removeShip} />
            );
          }, this)}

          <AddShipButton query={this.state.query} ship_add={this.props.ship_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.ships_elementid} addShip={this.addShip} placeholder={this.props.ships_placeholder} />
        </ul>
      );
    } else {
      return <ul></ul>;
    }
  }
});

// SubmitButton component.
// This intervenes and handles the submission of the story form.
var SubmitButton = React.createClass({
  // Function is run when the submit input is clicked.
  handleClick: function(e) {
    // Prevents default HTML input submission flow from occurring.
    e.preventDefault();

    // A "Story" object is created to pass data to.
    var Story = {};

    // The storyid is derived from the story-form element's
    // "data-story-id" attribute.
    var storyid = $("#story-form").data("story-id");

    // Takes the name, language, license, blurb, and description values
    // from their respective input fields/spinners.
    // Each is made to be a property of the Story object created above.
    Story.name = $("#story-name-field").val();
    Story.language = $("#story-language-select").val();
    Story.license = $("#story-license-select").val();
    Story.blurb = $("#story-blurb-field").val();
    Story.description = $("#story-description-field").val();

    // An array is created out of the franchises passed from parent components
    // and then made a property of the Story object.
    Story.franchise_ids = this.props.franchises.map(function(franchise) {
      return franchise.id;
    });

    // Ditto above, albeit with characters instead of franchises.
    Story.character_ids = this.props.characters.map(function(character) {
      return character.id;
    });

    console.log(Story);
    console.log(storyid);

    console.log(JSON.stringify(Story));

    // Our Rails backend requests that the story be submitted in the form of
    //
    // {
    //    story: {
    //      *properties go here*
    //    }
    // }
    //
    // So the Story object is converted into that format.
    Story = {story: Story};

    console.log(JSON.stringify(Story));

    // Depending on whether or not the storyid variable returns null,
    // meaning that no story ID was present when the form was created,
    // the method used in the AJAX submission is either "PUT" or "POST",
    // depending on whether or not the story is being created or edited.
    var method = storyid ? "PUT" : "POST";

    console.log(method);

    // AJAX is used to submit the story as JSON.
    $.ajax("/stories/" + storyid, {
      dataType: "json",
      data: JSON.stringify(Story),
      contentType: "application/json; encoding=utf-8",
      method: method,
      // If the AJAX request responds with a success header, the user is
      // redirected to the page for the story they've just submitted.
      success: function(data) {
        window.location.href = "/stories/" + data.id;
      },
      // Otherwise throw some errors.
      error: function(error) {
        console.log(error);
        console.log(JSON.parse(error.responseText));
      }
    });
  },
  render: function() {
    return (
      <div>
        <input type="submit" name="commit" value={this.props.submit} id={this.props.elementid} onClick={this.handleClick} />
      </div>
    );
  }
});

// ReactFormElements component used in the Rails view.
var ReactFormElements = React.createClass({
  render: function() {
    console.log(this.props.franchises);
    // All properties passed from the Rails helper are forwarded onto
    // the Franchises component by the {...this.props} line.
    return (
      <div>
        <Franchises {...this.props} />
      </div>
    );
  }
});
