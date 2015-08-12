var ActiveCharacter = React.createClass({
  onRemove: function(){
    this.props.onRemove({
      id: this.props.id,
      name: this.props.name,
      franchise_id: this.props.franchise_id
    });
  },
  render: function(){
    return (
      <li className="form-character character-active">
        <span className="form-character-name">{this.props.name}</span>
        <span className="icon icon-close" onClick={this.onRemove}></span>
      </li>
    );
  }
});

var InactiveCharacter = React.createClass({
  onAdd: function(){
    this.props.onAdd({
      id: this.props.id,
      name: this.props.name,
      franchise_id: this.props.franchise_id
    });
  },
  render: function(){
    return (
      <li classNmae="form-character character-inactive">
        <span className="form-character-name">{this.props.name}</span>
        <span className="icon icon-add" onClick={this.onAdd}>+</span>
      </li>
    );
  }
});
