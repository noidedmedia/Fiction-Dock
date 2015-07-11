var GenericLabel = React.createClass({
  render: function() {
    return (
      <label htmlFor={this.props.elementfor}>{this.props.label}</label>
    );
  }
});

var ListItem = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.data.name
    };
  },
  handleDelete: function(e) {
    this.props.remove(this.props.data);
  },
  render: function() {
    return (
      <li style={this.state.style}>
        <div>
          <span className="icon icon-close" onClick={this.handleDelete}></span>

          {this.state.name}
        </div>
      </li>
    );
  }
});

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
      React.findDOMNode(this.refs.franchiseInput).focus();
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addFranchise: function(e) {
    // Forward the chosen franchise along to the main React class.
    this.props.addFranchise(e.target.data);

    // Hide input, remove suggestions
    this.props.onChange("");
    this.setState({showinput: false});
    this.props.suggestions.length = 0;
  },
  render: function() {
    return (
      <li>
        <div ref="addFranchiseButton" id="add-franchise-button" className={this.state.showinput ? "add-new-franchise hidden" : "add-new-franchise shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.franchise_add}

          <input ref="franchiseInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onClick={this.preventBubbling} onChange={this.onChange} />
        </div>

        <div className={this.props.suggestions.length > 0 ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(franchise, i) {
              return (
                <li key={franchise.id} data={franchise} ref={'franchise' + i} onClick={this.addFranchise}>{franchise.name}</li>
              );
            }, this)}
          </ul>
        </div>
      </li>
    );
  }
});

var Franchises = React.createClass({
  getInitialState: function() {
    return {
      franchisequery: "",
      suggestions: [],
      franchises: this.props.franchises,
      characters: this.props.characters
    };
  },
  handleChange: function(query) {
    this.setState({ franchisequery: query });

    var _this = this;

    if (query === "") {
      this.setState({ suggestions: [] });
    } else {
      $.ajax("/franchises/complete.json?query=" + query, {
        dataType: "json",
        error: function() {
          console.log("ERROR");
        },
        success: function(data) {

          var suggestions = [];

          data.map(function(franchise, i) {
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
    var franchises = this.state.franchises.push(franchise);

    console.log("Franchises:");
    console.log(this.state.franchises);

    console.log("Adding:");
    console.log(franchise);
  },
  removeFranchise: function(franchise) {
    var franchises = this.state.franchises.filter(function(f) {
      return franchise.id !== f.id;
    });

    console.log("Removing:");
    console.log(franchise);

    this.setState({franchises: franchises});
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
              <div>
                <ListItem key={franchise.id} data={franchise} ref={'franchise' + i} remove={this.removeFranchise} />
                <Characters characters={characters} elementid={this.props.characters_elementid} placeholder={this.props.characters_placeholder} character_add={this.props.character_add} franchise={franchise} />
              </div>
            );
          }, this)}
          
          <AddFranchiseButton query={this.state.query} franchise_add={this.props.franchise_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.elementid} addFranchise={this.addFranchise} />

        </ul>

        <SubmitButton submit={this.props.submit} elementid={this.props.submit_elementid} />
      </div>
    );
  }
});

var AddCharacterButton = React.createClass({
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

    this.props.onChange(e.target.value);
  },
  onBlur: function() {
    this.setState({inputfocus: false});
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      React.findDOMNode(this.refs.characterInput).focus();
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addCharacter: function(e) {
    // Forward the chosen franchise along to the main React class.
    this.props.addCharacter(e.target.data);

    this.props.onChange(false);
    this.setState({showinput: false, inputfocus: false});
    this.props.suggestions.length = 0;
  },
  render: function() {
    return (
      <li>
        <div ref="addCharacterButton" id="add-character-button" className={this.state.showinput ? "add-new-character hidden" : "add-new-character shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.character_add}

          <input ref="characterInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onClick={this.preventBubbling} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} />
        </div>

        <div className={this.state.inputfocus ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(character, i) {
              return (
                <li key={character.id} data={character} ref={'character' + i} onClick={this.addCharacter}>{character.name}</li>
              );
            }, this)}
          </ul>
        </div>

      </li>
    );
  }
});

var Characters = React.createClass({
  getInitialState: function() {
    return {
      suggestions: [],
      characters: this.props.characters
    };
  },
  removeCharacter: function(character) {
    var characters = this.state.characters.filter(function(c) {
      return character.id !== c.id;
    });

    console.log("Removing:");
    console.log(character);

    this.setState({characters: characters});
  },
  addCharacter: function(character) {
    var characters = this.state.characters.push(character);
  },
  handleChange: function(query) {
    var _this = this;
    var franchise = this.props.franchise;

    if (query === false) {
      this.setState({ suggestions: [] });
    } else {
      $.ajax("/franchises/" + franchise.slug + ".json", {
        dataType: "json",
        success: function(data) {

          console.log(data);

          var suggestions = [];
          data = data.characters;

          console.log(data);

          data.map(function(character, i) {
            suggestions.push(character);
          });

          console.log(suggestions);

          _this.setState({ suggestions: suggestions });
        }
      });
    }
  },
  render: function() {
    console.log(this.state.characters);
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
  }
});

var SubmitButton = React.createClass({
  render: function() {
    return (
      <div>
        <input type="submit" name="commit" value={this.props.submit} id={this.props.elementid} />
      </div>
    );
  }
});

var ReactFormElements = React.createClass({
  render: function() {
    console.log(this.props.franchises);
    return (
      <div>
        <Franchises {...this.props} />
      </div>
    );
  }
});
