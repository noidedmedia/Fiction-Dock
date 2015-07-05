var Franchises = React.createClass({
  render: function() {
    return (
      <div>
        <GenericLabel elementfor={this.props.franchises_elementid} label={this.props.franchises_label} />
        
        <input id={this.props.franchises_elementid} type="text" placeholder={this.props.franchises_placeholder} />

        <FranchiseList franchises={this.props.franchises} />
      </div>
    );
  }
});

var Characters = React.createClass({
  render: function() {
    return (
      <div>
        <GenericLabel elementfor={this.props.characters_elementid} label={this.props.characters_label} />
        
        <input id={this.props.characters_elementid} type="text" placeholder={this.props.characters_placeholder} />
      </div>
    );
  }
});

var GenericLabel = React.createClass({
  render: function() {
    return (
      <label htmlFor={this.props.elementfor}>{this.props.label}</label>
    );
  }
});

var FranchiseItem = React.createClass({
  render: function() {
    return (
      <li>{this.props.data.name}</li>
    );
  }
});

var FranchiseList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.franchises.map(function(franchise) {
          return <FranchiseItem key={franchise.id} data={franchise} />;
        })}
      </ul>
    );
  }
});

var ReactFormElements = React.createClass({
  render: function() {
    return (
      <div>
        <Franchises franchises_elementid={this.props.franchises_elementid} franchises_label={this.props.franchises_label} franchises_placeholder={this.props.franchises_placeholder} franchises={this.props.franchises} />
        <Characters characters_elementid={this.props.characters_elementid} characters_label={this.props.characters_label} characters_placeholder={this.props.characters_placeholder} characters={this.props.characters} />
      </div>
    );
  }
});
