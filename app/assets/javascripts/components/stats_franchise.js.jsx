var FranchiseStats = React.createClass({
  render: function() {
    console.log(this.props);
    return (
      <div id="franchise-stats">
      <h1>Characters By Popularity</h1>
      <CharacterPopularity characters={this.props.characters} franchise_slug={this.props.slug}/>
      <h1>Ships by Popularity</h1>
      <ShipList ships={this.props.ships_by_frequency}/>
      <h1>Cross-Franchise Ships by Popularity</h1>
      <ShipList ships={this.props.foreign_ships} />
      </div>
    );
  }
});

var CharacterPopularity = React.createClass({
  render: function() {
    return (
      <ul class="character-popularity">
        {this.props.characters.map(function(c) {
          return <CharacterPopularityItem {...c} franchise_slug={this.props.franchise_slug} key={c.id} />;
        }.bind(this))}
      </ul>
    );
  }
});

var CharacterPopularityItem = React.createClass({
 render: function() {
    return (
      <li>
        <a href={this.url()}>{this.props.name} ({this.props.stories_count} stories)</a>
      </li>
    );
  },
  url: function() {
    return ["franchises/",
      this.props.franchise_slug,
      "/characters/",
      this.props.slug].join("");
  }
});

function getFranchiseStats(c) {
  console.log("getting franchise stats");
  $.getJSON(c.data("json_url"), function(resp) {
    React.render(
      <FranchiseStats {...resp} />,
      c[0]);
  });
}
