var FranchisesInput = React.createClass({
  render: function() {
    return (
      <div></div>
    );
  }
});

var GenericLabel = React.createClass({
  render: function() {
    return (
      <label htmlFor={this.props.elementfor}>{this.props.text}</label>
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

