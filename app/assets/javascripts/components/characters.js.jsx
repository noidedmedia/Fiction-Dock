
/*  Characters
   ============================================== */

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

          <AddCharacterButton query={this.state.query} character_add={this.props.character_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.characters_elementid} addCharacter={this.addCharacter} placeholder={this.props.characters_placeholder} franchise_id={this.props.franchise_id} emptySuggestions={this.emptySuggestions} />
        </ul>
      );
    } else {
      return <ul></ul>;
    }
  }
});



/* Add Character Button
   ============================================== */

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
  hideInput: function(e) {
    // Make sure that clicking on the close button doesn't cause it to immediately reopen itself.
    this.preventBubbling(e);

    // Hide input, empty input field value.
    this.setState({showinput: false, inputfocus: false});
    $(React.findDOMNode(this.refs.characterInput)).val("");

    // Remove suggestions.
    this.props.emptySuggestions();
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addCharacter: function(e) {
    console.log(e.target.data);

    // Forward the chosen franchise along to the main React class.
    this.props.addCharacter(e.target.data);
    
    this.setState({showinput: false, inputfocus: false});
    
    // Empty the characterInput field.
    $(React.findDOMNode(this.refs.characterInput)).val("");
  },
  render: function() {
    return (
      <li>
        <div ref="addCharacterButton" id="add-character-button" className={this.state.showinput ? "add-new-character hidden" : "add-new-character shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.character_add}

          <input ref="characterInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.handleChange} onFocus={this.onFocus} />

          <span className="icon icon-close" onClick={this.hideInput}></span>
        </div>

        <Suggestions showsuggestions={ this.state.inputfocus ? true : false } suggestions={this.props.suggestions} itemOnClick={this.addCharacter} itemtype="character" bindnull={false} />
      </li>
    );
  }
});
