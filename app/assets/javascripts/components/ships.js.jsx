
/* Ships
   ============================================== */

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
    var c = this.state.characters;
    c.splice(c.indexOf(char), 1);
    this.setState({
      characters: c
    });
  },
  addCharacter: function(char){
    var c = this.state.characters;
    c.push(char);
    setState({
      characters: c
    });
  },
  render: function(){
    console.log("Ship props:",this.props);
    return (
      <li>
      <ul>
      <Characters key={'shipchars' + this.key} characters={this.state.potential_characters} elementid="test" placeholder="test" character_add="test" franchise={{}} addCharacter={this.addCharacter} removeCharacter={this.removeCharacter} />
      </ul>
      <input></input>
      <Suggestions showsuggestions={ this.props.potential_characters.length > 0 ? true : false } suggestions={this.props.potential_characters} itemOnClick={this.addCharacter} itemtype={"ship_" + this.key + "_character"} bindnull={false} />
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
