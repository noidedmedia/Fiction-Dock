var Franchises = React.createClass({
  render: function() {
    return (
      <div>
        <GenericLabel elementfor={this.props.franchises_elementid} label={this.props.franchises_label} />

        <FranchiseList franchises={this.props.franchises} elementid={this.props.franchises_elementid} placeholder={this.props.franchises_placeholder} franchise_add={this.props.franchise_add} />
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
  handleClick: function() {
    this.props.data = null;
    onChange();
  },
  render: function() {
    return (
      <li>
        <div>
          <span className="icon icon-close" onClick={this.handleClick}></span>

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
    this.setState({show: this.state.show === 'input-shown' ? 'input-hidden' : 'input-shown' });
    $("#add-franchise-button").toggleClass("hidden");
  },
  render: function() {
    if (!this.state.show) {
      var classString = "hidden";
    }
    var preventbubbling = function(e) {
      e.stopPropagation();
    };
    return (
      <ul className="franchise-list">
        {this.props.franchises.map(function(franchise) {
          return <ListItem key={franchise.id} data={franchise} />;
        })}
        <li id="add-franchise-button" className={classString} onClick={this.handleClick}>
          <div>
            <span className="icon icon-plus"></span>
            {this.props.franchise_add}

            <input id={this.props.elementid} className={this.state.show} type="text" placeholder={this.props.placeholder} onClick={preventbubbling} />
          </div>
        </li>
      </ul>
    );
  }
});

var ReactFormElements = React.createClass({
  render: function() {
    return (
      <div>
        {/* Pass forward all the props to the other React classes. */}
        <Franchises {...this.props} />
        <Characters {...this.props} />
      </div>
    );
  }
});

var onChange = function() {
  React.render(
    <ReactFormElements {...this.props} />,
    document.getElementById('react-form-elements')
  );
};
