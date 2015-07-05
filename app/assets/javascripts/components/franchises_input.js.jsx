var Franchises = React.createClass({
  render: function() {
    return (
      <div>
        <GenericLabel elementfor={this.props.elementid} label={this.props.label} />
        
        <input id={this.props.elementid} type="text" placeholder={this.props.placeholder} />

        <FranchiseList franchises={this.props.franchises} />
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

