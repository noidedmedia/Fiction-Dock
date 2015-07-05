var Franchises = React.createClass({
  render: function() {
    return (
      <div>
        <GenericLabel elementfor={this.props.franchises_elementid} label={this.props.franchises_label} />

        <FranchiseList franchises={this.props.franchises} elementid={this.props.franchises_elementid} placeholder={this.props.franchises_placeholder} />
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

var ListItem = React.createClass({
  render: function() {
    return (
      <li>
        <div>
          <span className="icon icon-close"></span>

          {this.props.data.name}
        </div>
      </li>
    );
  }
});

var FranchiseList = React.createClass({
  getInitialState: function() {
    return { show: 'hidden' };
  },
  handleClick: function() {
    this.setState({show: this.state.show === 'shown' ? 'hidden' : 'shown' });
  },
  render: function() {
    return (
      <ul>
        {this.props.franchises.map(function(franchise) {
          return <ListItem key={franchise.id} data={franchise} />;
        })}

        <input id={this.props.elementid} className={this.state.show} type="text" placeholder={this.props.placeholder} />

        <li onClick={this.handleClick}><span className="icon icon-plus"></span>Add a new franchise</li>
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
