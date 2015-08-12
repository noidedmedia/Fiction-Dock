var FormShip = React.createClass({
  getInitialState: function(){
    return {characters: this.props.characters};
  },
  componentWillRecieveProps: function(nextProps){
    this.setState({
      characters: this.state.characters.filter(function(c){
        return this.props.potential_characters.indexOf(c) !== -1;
      }.bind(this))
    });
  },
  removeCharacter: function(char){
    console.log("remove character called on ship");
    var c = this.state.characters;
    c.splice(c.indexOf(char), 1);
    this.setState({
      characters: c
    });
  },
  addCharacter: function(char){
    var c = this.state.characters;
    console.log("add character called on ship");
    c.push(char);
    setState({
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
      return <ActiveCharacter {...c} onAdd={this.addCharacter} key={"ship" + this.props.reactKey + "character" + c.id}/>;
    }.bind(this));

    console.log("active characters:",this.state.characters);
    // rinactive is inactive values to return
    var rinactive = inactive.map(function(c){
      return <InactiveCharacter {...c} onRemove={this.removeCharacter} key={"ship" + this.props.reactKey + "character" + c.id}/>;
    }.bind(this));
    return active.concat(rinactive);
  },
  render: function(){
    console.log("Ship props:",this.props);
    return (
      <li>
        <h1>Ship</h1>
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
