var FormFranchise = React.createClass({
  getInitialState: function() {
    return {
      addcharacterisactive: false
    };
  },
  // Remove this franchise from the overall list
  removeFranchise: function() {
    this.props.removeFranchise({
      id: this.props.id,
      name: this.props.name
    });
  },
  addCharacters: function() {
    this.setState({
      addcharacterisactive: true
    });
  },
  closeAddCharacters: function(e) {
    e.stopPropagation();
    this.setState({
      addcharacterisactive: false
    });
  },
  render: function() {
    console.log("FormFranchise props:",this.props);
    return (
      <li>
        <div className="franchise-list-item-header">
          <p>{this.props.name}</p>
          <span className="icon icon-close" title={this.props.translations.remove} onClick={this.removeFranchise}></span>
        </div>
        <ul className="character-list">
          {this.props.active_characters.map(function(c) {
            return <ActiveCharacter {...c} onRemove={this.props.removeCharacter} key={"character" + c.id} translations={this.props.translations} />;
          }.bind(this))}

          <div className="add-character-container">
            <div className={this.state.addcharacterisactive ? "add-character-button active" : "add-character-button"} onClick={this.addCharacters}>
              <span className="icon icon-plus"></span>
              {this.props.translations.add_characters}
              <span className="icon icon-close" onClick={this.closeAddCharacters}></span>
            </div>

            <div className={this.state.addcharacterisactive ? "character-suggestions" : "character-suggestions hidden"}>
              {this.props.inactive_characters.map(function(c) {
                return <InactiveCharacter {...c} onAdd={this.props.addCharacter} key={"character" + c.id} translations={this.props.translations} />;
              }.bind(this))}
            </div>
          </div>
        </ul>
      </li>
    );
  }
});


var FranchiseAdder = React.createClass({
  getInitialState: function() {
    return {
      step: "button"
    };
  },
  displaySuggestor: function(e) {
    e.preventDefault();
    this.setState({
      step: "suggestor"
    });
    $(React.findDOMNode(this.refs.franchiseInput)).val("").focus();
  },
  displayButton: function() {
    this.setState({
      step: "button"
    });
  },
  render: function() {
    if (this.state.step == "button") {
      return (
        <div className="add-franchise-button" onClick={this.displaySuggestor}>
          <span className="icon icon-plus"></span>
          {this.props.translations.add_a_new_franchise}
        </div>
      );
    } else if (this.state.step == "suggestor") {
      return (
        <div>
          <FranchiseSuggestor onAdd={this.props.onAdd} displayButton={this.displayButton} translations={this.props.translations} />
        </div>
      );
    }
  }
});

var FranchiseSuggestor = React.createClass({
  getInitialState: function() {
    return {
      suggestions: false
    };
  },
  suggest: function(e) {
    var prefix = e.target.value;
    console.log("getting prefix:",prefix);
    var url = "/franchises/complete?query=" + prefix;
    console.log("getting with URL:",url);
    $.getJSON(url, function(sugg){
      console.log(sugg);
      this.setState({
        suggestions: sugg
      });
    }.bind(this));
  },
  onAdd: function(f) {
    $.getJSON("/franchises/" + f.id + ".json", function(fr) {
      this.props.onAdd(fr);
    }.bind(this));
    this.props.displayButton();
  },
  getSuggestionsJSX: function() {
    if (this.state.suggestions === []) {
      return (
        <div className="suggestions-container">
          <ul className="suggestions">
            <li className="no-suggestions">{this.props.translations.no_suggestions_found}</li>
          </ul>
        </div>
      );
    } else if (this.state.suggestions !== false) {
      return (
        <div className="suggestions-container active">
          <ul className="suggestions">
            {this.state.suggestions.map(function(f) {
              var callback = function() {
                this.onAdd(f);
              }.bind(this);
              return <li key={f.name} className="suggestion" onClick={callback}>{f.name}</li>;
            }.bind(this))}
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  },
  render: function() {
    return (
      <div className="add-franchise-input">
        <input ref="franchiseInput" onChange={this.suggest}></input>
        <span className="icon icon-close" onClick={ this.props.displayButton }></span>

        { this.getSuggestionsJSX() }
      </div>
    );
  }
});
