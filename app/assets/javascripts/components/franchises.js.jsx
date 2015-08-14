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
        <h1>{this.props.name}</h1>
        <span className="icon icon-close" onClick={this.sudoku}></span>
        <ul className="character-list">
          {this.props.active_characters.map(function(c) {
            return <ActiveCharacter {...c} onRemove={this.props.removeCharacter} key={"character" + c.id} />;
          }.bind(this))}

          {this.props.inactive_characters.map(function(c) {
            return <InactiveCharacter {...c} onAdd={this.props.addCharacter} key={"character" + c.id} />;
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
      return <button id="add-franchise-button" onClick={this.displaySuggestor}>Add a Franchise</button>;
    } else if (this.state.step == "suggestor") {
      return <FranchiseSuggestor onAdd={this.props.onAdd} />;
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
        <div>
          <ul className="suggestions">
            <li className="no-suggestions">No suggestions found</li>
          </ul>
        </div>
      );
    } else if (this.state.suggestions !== false) {
      return (
        <div>
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
