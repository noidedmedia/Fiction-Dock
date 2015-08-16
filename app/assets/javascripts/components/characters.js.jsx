var ActiveCharacter = React.createClass({
  onRemove: function() {
    this.props.onRemove({
      id: this.props.id,
      name: this.props.name,
      franchise_id: this.props.franchise_id
    });
  },
  render: function() {
    return (
      <li className="form-character active">
        <span className="icon icon-close" onClick={this.onRemove} title={this.props.translations.remove}></span>
        {this.props.name}
      </li>
    );
  }
});

var InactiveCharacter = React.createClass({
  onAdd: function() {
    this.props.onAdd({
      id: this.props.id,
      name: this.props.name,
      franchise_id: this.props.franchise_id
    });
  },
  render: function() {
    return (
      <li className="form-character inactive">
        <span className="icon icon-plus" onClick={this.onAdd}></span>
        {this.props.name}
      </li>
    );
  }
});
