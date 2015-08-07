var CharacterStats = React.createClass({
  render: function(){
    console.log(this.props);
    return (
      <div id="character-stats">
      <h1>Popular Ships</h1>
      <ShipList ships={this.props.ships_by_frequency}/>
      <h1>Popular Cross-Franchise Ships</h1>
      <ShipList ships={this.props.foreign_ships}/>
      </div>
      );
  }
});


var CharacterItem = React.createClass({
  render: function(){
    return (
      <li className="character-list-item">
      <a href={this.characterUrl()}>{this.props.name}</a> <a href={this.franchiseUrl()}>({this.props.franchise_name})</a>
      </li>);
  },
  characterUrl: function(){
    return [this.franchiseUrl(),
           "characters/",
           this.props.id].join("");
  },
  franchiseUrl: function(){
    return ["/franchises/",
            this.props.franchise_id].join("");
  }
});
/*
 * Render one ship, and its characters
 */
var Ship = React.createClass({
  render: function(){
    console.log("Ship props:",this.props);
    return (
      <li className="ship-list-item">
      <a href={this.shipUrl()}>
      {this.props.story_count} Stories
      </a>
      <ul className="ship-characters-list">
      {this.props.characters.map(function(c){
        return <CharacterItem {...c} key={c.id} />;
      })}
      </ul>
      </li>);
  },
  shipUrl: function(){
    return "/ships/" + this.props.id;
  }
});

/* 
 * Component that renders multiple ships.
 * Pass it an array of ships in Ship and it will render them.
 */
var ShipList = React.createClass({
  render: function(){
    console.log("Shiplist props:", this.props);
    return(
      <ul className="ship-list">
      {this.props.ships.map(function(ship){
          return <Ship {...ship} key={ship.id}/>;
        })}
      </ul>
      )
  }
});
function getCharacterStats(container){
  console.log("get character stats");
  var json_url = container.data("json_url");
  console.log("Getting stats from URL:", json_url);
  container.append($("<div>").append("Loading..."));
  $.getJSON(json_url, function(resp){
    container.empty();
    console.log("got json, making react component");
    React.render(
      <CharacterStats {...resp}/>,
      container.get(0));
  });
}
