var FormShip = React.createClass({
  componentWillReceiveProps: function(nextProps) {
  },
  removeCharacter: function(char) {
    console.group("Remove character in ship");
    console.log("Removing",char,"from ship with id:",this.props.reactKey);
    var c = this.props.characters.filter(function(ch) {
      return ch.id !== char.id;
    });
    console.log("Filtered characters in ship is:",c);
    this.props.onCharacterChange(this.props.reactKey, c);
    console.groupEnd();
  },
  addCharacter: function(char) {
    console.group("Begin add character in ship");
    console.log("Adding character ", char, "in ship #", this.props.reactKey);
    var c = this.props.characters;
    console.log("Characters used to be ", c);
    c.push(char);
    console.log("Characters is currently ",c);
    this.props.onCharacterChange(this.props.reactKey, c);
    console.groupEnd();
  },
  getCharacterList: function() {
    var inactive = this.props.potential_characters.filter(function(c) {
      for (var ch in this.props.characters) {
        if (c.id == this.props.characters[ch].id) {
          return false;
        }
      }
      return true;
    }.bind(this));
    var active = this.props.characters.map(function(c) {
      return <ActiveCharacter {...c} onRemove={this.removeCharacter} key={"ship" + this.props.reactKey + "character" + c.id} translations={this.props.translations} />;
    }.bind(this));
    // rinactive is inactive values to return
    var rinactive = inactive.map(function(c) {
      return <InactiveCharacter {...c} onAdd={this.addCharacter} key={"ship" + this.props.reactKey + "character" + c.id} translations={this.props.translations} />;
    }.bind(this));
    return active.concat(rinactive);
  },
  removeSelf: function() {
    this.props.onRemove(this.props.reactKey);
  },
  render: function() {
    console.log("Ship props:",this.props);
    return (
      <li>
        <div className="ship-list-item-header">
          <p>{this.props.translations.ship}</p>
          <span onClick={this.removeSelf} className="icon icon-close" title={this.props.translations.remove}></span>
        </div>
        
        <ul className="character-list">
          { this.getCharacterList() }
        </ul>
      </li>
    );
  }
});



/* Add Ship Button
   ============================================== */

var AddShipButton = React.createClass({
  render: function() {
    return (
      <div id="add-ship-button" onClick={this.props.addShip}>
        <span className="icon icon-plus"></span>
        {this.props.translations.add_a_new_ship}
      </div>
    );
  }
});
