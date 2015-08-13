var FormShip = React.createClass({
  getInitialState: function(){
    return {characters: this.props.characters};
  },
  componentWillReceiveProps: function(nextProps){
    var newchars = this.state.characters.filter(function(ch){
      for(var c in nextProps.potential_characters){
        if(nextProps.potential_characters[c].id === ch.id){
          return true;
        }
      }
      return false;
    }.bind(this))
    console.log("Transitioning characters to", newchars);
    console.log("got props:",nextProps);
    console.log("was:",this.state);
    this.setState({
      characters: newchars
    });
  },
  removeCharacter: function(char){
    console.log("remove character called on ship with character:",char);
    var c = this.state.characters.filter(function(c){
      return c.id !== char.id;
    });
    this.setState({
      characters: c
    });
  },
  addCharacter: function(char){
    var c = this.state.characters;
    console.log("add character called on ship with character:",char);
    console.log("old characters:",c);
    c.push(char);
    console.log("new characters:",c);
    this.setState({
      characters: c
    });
  },
  getCharacterList: function(){
    var inactive = this.props.potential_characters.filter(function(c){
      for(var ch in this.state.characters){
        if(c.id == this.state.characters[ch].id){
          return false;
        }
      }
      return true;
    }.bind(this));
    console.log("inactive characters:",inactive);
    var active = this.state.characters.map(function(c){
      return <ActiveCharacter {...c} onRemove={this.removeCharacter} key={"ship" + this.props.reactKey + "character" + c.id}/>;
    }.bind(this));

    console.log("active characters:",this.state.characters);
    // rinactive is inactive values to return
    var rinactive = inactive.map(function(c){
      return <InactiveCharacter {...c} onAdd={this.addCharacter} key={"ship" + this.props.reactKey + "character" + c.id}/>;
    }.bind(this));
    return active.concat(rinactive);
  },
  removeSelf: function(){
    this.props.onRemove(this.props.reactKey);
  },
  render: function(){
    console.log("Ship props:",this.props);
    return (
      <li>
        <h1>Ship <span onClick={this.removeSelf} className="icon icon-close"></span></h1>
        <ul>
          {this.getCharacterList()}
        </ul>
      </li>
    );
  }
});



/* Add Ship Button
   ============================================== */

var AddShipButton = React.createClass({
  render: function(){
    return <button onClick={this.props.addShip}>Add a Ship</button>;
  }
});
