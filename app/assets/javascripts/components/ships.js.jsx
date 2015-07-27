
/* Ships
   ============================================== */

var Ships = React.createClass({
  propTypes: {
    characters: React.PropTypes.arrayOf(React.PropTypes.object) 
  },
  getInitialState: function() {
    return {
      suggestions: this.props.characters,
      ships: this.props.ships
    };
  },
  removeShip: function(ship) {
    var ships = this.state.ships.filter(function(s) {
      return ship.id !== s.id;
    });

    console.log("Removing:");
    console.log(ship);

    this.setState({ships: ships});
  },
  addShipCharacter: function(e) {
    e.persist();
    console.log(e);
    console.log(e.target.data);
    console.log(e.target.props);
    console.log(e.target);
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

            <AddShipButton query={this.state.query} ship_add={this.props.ship_add} onChange={this.handleChange} suggestions={this.state.suggestions} elementid={this.props.ships_elementid} addShipCharacter={this.addShipCharacter} placeholder={this.props.ships_placeholder} />
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
  propTypes: {
    onChange: React.PropTypes.func,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.object)
  },
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
    this.props.onChange(shipinput);
  },
  hideInput: function(e) {
    // Make sure that clicking on the close button doesn't cause it to immediately reopen itself.
    this.preventBubbling(e);

    // Hide input, empty input field value.
    this.setState({showinput: false, inputfocus: false}, function() {
      $(React.findDOMNode(this.refs.shipInput)).val("");
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  render: function() {
    return (
      <li>
        <div ref="addShipButton" id="add-ship-button" className={this.state.showinput ? "add-new-ship hidden" : "add-new-ship shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.ship_add}

          <input ref="shipInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onChange={this.onChange} onFocus={this.onFocus} />

          <span className="icon icon-close" onClick={this.hideInput}></span>
        </div>

        <Suggestions key={"shipcharactersuggestor"} showsuggestions={ this.state.inputfocus ? true : false } suggestions={this.props.suggestions} itemOnClick={this.props.addShipCharacter} itemtype="shipcharacter" bindnull={false} />

      </li>
    );
  }
});
