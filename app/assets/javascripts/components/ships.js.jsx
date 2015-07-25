
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
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      $(React.findDOMNode(this.refs.shipInput)).focus();
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
    console.log(e.target.data);
  },
  render: function() {
    return (
      <li>
        <div ref="addShipButton" id="add-ship-button" className={this.state.showinput ? "add-new-ship hidden" : "add-new-ship shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.ship_add}

          <input ref="shipInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.onChange} onFocus={this.onFocus} />

        </div>

      </li>
    );
  }
});
