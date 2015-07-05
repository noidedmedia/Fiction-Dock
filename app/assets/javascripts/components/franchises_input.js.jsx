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
