
/* Ships
   ============================================== */

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
        <div>
          <div className="section-header">{this.props.ships_label}</div>

          <ul className="ship-list">
            {this.state.ships.map(function(ship, i) {
              console.log(ship);
              return (
                <ListItem key={'ship' + i} data={ship} remove={this.removeShip} />
              );
            }, this)}

            <AddShipButton query={this.state.query} ship_add={this.props.ship_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.ships_elementid} addShip={this.addShip} placeholder={this.props.ships_placeholder} />
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
