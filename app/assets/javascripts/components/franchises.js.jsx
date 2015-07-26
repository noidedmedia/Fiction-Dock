
/* Franchises
   ============================================== */

// Franchises component
var Franchises = React.createClass({
  getInitialState: function() {
    // "Global" values for the franchises, characters, and ships
    // passed when submitting the story.
    return {
      franchisequery: "",
      suggestions: [],
      franchises: this.props.franchises,
      characters: this.props.characters,
      ships: this.props.ships
    };
  },
  // When the value of the FranchisesInput is modified, handleChange
  // is called with the value of the input as an argument.
  handleChange: function(query) {
    this.setState({ franchisequery: query });

    console.log(query);
    console.log(this.state.franchisequery);

    // If query is empty, the suggestions state is emptied.
    if (query === "") {
      this.setState({ suggestions: [] });
    } else {
      // An AJAX request which returns franchises with names similar
      // to the value of the input field.
      // These franchises are then used as suggestions for the
      // Franchises field.
      $.ajax("/franchises/complete.json?query=" + query, {
        dataType: "json",
        success: function(data) {

          console.log(data);

          var suggestions = [];

          // Pushes each suggestion returned from the AJAX request
          // into the new suggestions array.
          data.forEach(function(franchise, i) {
            console.log(franchise);
            suggestions.push(franchise);
          });

          console.log("Suggestions:");
          console.log(suggestions);

          // Updates suggestions state with new suggestions.
          this.setState({ suggestions: suggestions });
        }.bind(this),
        error: function() {
          console.log("Error");
        }
      });
    }
  },
  // Adds a new franchise to the franchises state.
  addFranchise: function(franchise) {
    var franchises = this.state.franchises;

    // Push franchise argument into the franchises array created above.
    franchises.push(franchise);

    console.log("Franchises:");
    console.log(this.state.franchises);

    console.log("Adding:");
    console.log(franchise);

    // Franchises state is updated to match the franchises array we've
    // just created.
    this.setState({ franchises: franchises }, function() {
      // Empty franchise suggestions after adding a franchise.
      this.setState({ suggestions: [] });
    }.bind(this));
  },
  // Removes a franchise from the franchises state.
  removeFranchise: function(franchise) {
    // Creates a new franchises variable out of the franchises state
    // after filtering the removed franchise out of the array.
    var franchises = this.state.franchises.filter(function(f) {
      return franchise.id !== f.id;
    });

    console.log("Characters:");
    console.log(this.state.characters);

    // Any characters that belong to the franchise being removed
    // are also removed.
    var characters = this.state.characters.filter(function(c) {
      return franchise.id !== c.franchise_id;
    });

    console.log("Characters2:");
    console.log(characters);

    console.log("Removing:");
    console.log(franchise);

    // Passes the updated franchises and characters arrays to their
    // respective states. 
    this.setState({ franchises: franchises }, function() {
      this.props.updateFranchises(franchises);
    });
    this.setState({ characters: characters }, function() {
      this.props.updateCharacters(characters);
    });
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
                <Characters key={'franchisecharacters' + franchise.id} characters={characters} elementid={this.props.characters_elementid} placeholder={this.props.characters_placeholder} character_add={this.props.character_add} franchise={franchise} addCharacter={this.props.addCharacter} removeCharacter={this.props.removeCharacter} />
              </div>
            );
          }, this)}
          
          <AddFranchiseButton query={this.state.franchisequery} franchise_add={this.props.franchise_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.elementid} addFranchise={this.addFranchise} />

        </ul>
      </div>
    );
  }
});



/* Add Franchise Button
   ============================================== */

// The "Add a new franchise" button
var AddFranchiseButton = React.createClass({
  getInitialState: function() {
    return { 
      showinput: false
    };
  },
  onChange: function(e) {
    // Passes the value of the input field to the "onChange" property
    // passed from the parent component.
    // Used for suggesting a franchise.
    this.props.onChange(e.target.value);
  },
  // Handles clicks on the AddFranchiseButton.
  handleClick: function() {
    // Sets showinput to 'input-shown', which applies it as a class
    // to the DOM node, modifying the style to appear as though
    // the button has been replaced by an input field.
    this.setState({ showinput: 'input-shown' }, function() {
      // "React.findDOMNode" returns the DOM element, which is then taken by JQuery
      // and given an empty value and a focus state.
      // This ensures that the input field won't have any old data in it.
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
  // Stops "bubbling up" of click events on the input field,
  // preventing handleClick from being called when the input
  // field is acted upon.
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  // First argument passed to function through .bind() has to be null,
  // because React.js is weird.
  // Source: https://groups.google.com/d/msg/reactjs/Xv9_kVoJJOw/fqLV06MR77gJ
  addFranchise: function(x, e) {
    console.log(e.target.data);

    // Event target data is the franchise object the user is trying
    // to add.
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

        <Suggestions showsuggestions={ this.props.suggestions.length > 0 ? true : false } suggestions={this.props.suggestions} itemOnClick={this.addFranchise} itemtype="franchise" bindnull={true} />
      </li>
    );
  }
});
