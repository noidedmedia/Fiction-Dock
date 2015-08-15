var FormFranchise = React.createClass({
  // Remove this franchise from the overall list
  sudoku: function() {
    this.props.removeFranchise({
      id: this.props.id,
      name: this.props.name
    });
  },
  render: function() {
    console.log("FormFranchise props:",this.props);
    return (
      <li>
        {this.props.name}
        <span className="icon icon-close" title={this.props.translations.remove} onClick={this.sudoku}></span>
        <ul className="character-list">
          {this.props.active_characters.map(function(c) {
            return <ActiveCharacter {...c} onRemove={this.props.removeCharacter} key={"character" + c.id} translations={this.props.translations} />;
          }.bind(this))}

          {this.props.inactive_characters.map(function(c) {
            return <InactiveCharacter {...c} onAdd={this.props.addCharacter} key={"character" + c.id} translations={this.props.translations} />;
          }.bind(this))}
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
  },
  render: function() {
    if (this.state.step == "button") {
      return (
        <div id="add-franchise-button" onClick={this.displaySuggestor}>
          <span className="icon icon-plus"></span>
          {this.props.translations.add_a_new_franchise}
        </div>
      );
    } else if (this.state.step == "suggestor") {
      return (
        <div>
          <FranchiseSuggestor onAdd={this.props.onAdd} translations={this.props.translations} />
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
        <div className="suggestions-container">
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
      <div>
        <input onChange={this.suggest}></input>
        { this.getSuggestionsJSX() }
      </div>
    );
  }
});
