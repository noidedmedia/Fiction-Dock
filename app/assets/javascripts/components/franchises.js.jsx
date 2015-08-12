var FormFranchise = React.createClass({
  render: function(){
    console.log("FormFranchise props:",this.props);
    return (<li>
      <h1>{this.props.name}</h1>
      <ul>
        {this.props.active_characters.map(function(c){
            return <ActiveCharacter {...c} onRemove={this.props.removeCharacter} key={"character" + c.id}/>;
        }.bind(this))}
        {this.props.inactive_characters.map(function(c){
          return <InactiveCharacter {...c} onAdd={this.props.addCharacter} key={"character" + c.id} />;
        }.bind(this))}
      </ul>
    </li>);
  }
});
