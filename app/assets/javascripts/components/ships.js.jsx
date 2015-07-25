
/* Ships
   ============================================== */

var Ships = React.createClass({
  getInitialState: function() {
    return {
      suggestions: this.props.characters,
      ships: [],
      query: ""
    };
  },
  componentWillMount: function() {
    if (this.props.ships) {
      this.setState({ ships: this.props.ships });
    }
  },
  removeShip: function(ship) {
    var ships = this.state.ships.filter(function(s) {
      return ship.id !== s.id;
    });

    console.log("Removing:");
    console.log(ship);

    this.setState({ ships: ships }, function() {
      this.props.removeShip(this.state.ships);
    });
  },
  addShip: function(ship) {
    console.log(ship);

    console.log(this.state.ships);
    var ships = this.state.ships;
    ships.push(ships);
    console.log(ships);

    this.setState({ ships: ships }, function() {
      this.props.addShip(this.state.ships);
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
        <div>
          <div className="section-header">{this.props.ships_label}</div>

          <ul className="ship-list">
            {this.state.ships.map(function(ship, i) {
              console.log(ship);
              return (
                <ListItem key={'ship' + i} data={ship} remove={this.removeShip} />
              );
            }, this)}

            <AddShipButton query={this.state.query} ship_add={this.props.ship_add} onChange={this.handleChange} suggestions={this.state.suggestions} characters={this.props.characters} elementid={this.props.ships_elementid} addShip={this.addShip} placeholder={this.props.ships_placeholder} emptySuggestions={this.emptySuggestions} />
          </ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});



/* Add Ship Button
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
  hideInput: function(e) {
    // Make sure that clicking on the close button doesn't cause it to immediately reopen itself.
    this.preventBubbling(e);

    // Hide input, empty input field value.
    this.setState({ showinput: false, inputfocus: false });
    $(React.findDOMNode(this.refs.shipInput)).val("");

    // Remove suggestions.
    this.props.emptySuggestions();
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      React.findDOMNode(this.refs.shipInput).focus();
    });

    this.setState({showinput: true, inputfocus: true});
    
    // Empty the shipInput field.
    $(React.findDOMNode(this.refs.shipInput)).val("");
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  addShipCharacter: function(e) {
    console.log(e.target.data);
    console.log(e.target);
    console.log(e);
  },
  render: function() {
    console.log(this.props.characters);
    return (
      <li>
        <div ref="addShipButton" id="add-ship-button" className={this.state.showinput ? "add-new-ship hidden" : "add-new-ship shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.ship_add}

          <input ref="shipInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.onChange} onFocus={this.onFocus} />

          <span className="icon icon-close" onClick={this.hideInput}></span>
        </div>

        <Suggestions showsuggestions={ this.state.inputfocus ? true : false } suggestions={this.props.suggestions} itemOnClick={this.addShipCharacter} itemtype="shipcharacter" bindnull={false} />

      </li>
    );
  }
});
