var GenericLabel = React.createClass({
  render: function() {
    return (
      <label htmlFor={this.props.elementfor}>{this.props.label}</label>
    );
  }
});

var ListItem = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.data.name,
      style: {
        display: 'block'
      }
    };
  },
  handleDelete: function() {
    this.setState({
      name: null,
      style: {
        display: 'none'
      }
    });
  },
  render: function() {
    return (
      <li style={this.state.style}>
        <div>
          <span className="icon icon-close" onClick={this.handleDelete}></span>

          {this.state.name}
        </div>
      </li>
    );
  }
});

var FranchiseList = React.createClass({
  getInitialState: function() {
    return { 
      showinput: false,
      query: "",
    };
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      React.findDOMNode(this.refs.franchiseInput).focus();
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  handleChange: function(e) {
    this.setState({ query: e.target.value });

    var that = this;

    $.ajax("/franchises/complete.json?query=" + this.state.query, {
      dataType: "json",
      success: function(data) {
        var suggestions = [];

        data.map(function(franchise, i) {
          suggestions[i] = franchise.name;

          that.franchiseSuggest(suggestions);
        });
      }
    });
  },
  franchiseSuggest: function(suggestions) {
    if (suggestions) {
      return (
        suggestions.map(function(franchise, i) {
          return (
            <li>{franchise.name}</li>
          );
        })
      );
    }
  },
  render: function() {
    return (
      <ul className="franchise-list">
        {this.props.franchises.map(function(franchise, i) {
          return (
            <ListItem key={franchise.id} data={franchise} ref={'franchise' + i} />
          );
        }, this)}
        <li ref="addFranchiseButton" id="add-franchise-button" className={this.state.showinput ? "hidden" : "shown"} onClick={this.handleClick} >
          <div>
            <span className="icon icon-plus"></span>
            {this.props.franchise_add}

            <input ref="franchiseInput" id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onClick={this.preventBubbling} onChange={this.handleChange} />
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
        <div>
          <GenericLabel elementfor={this.props.franchises_elementid} label={this.props.franchises_label} />

          <FranchiseList franchises={this.props.franchises} elementid={this.props.franchises_elementid} placeholder={this.props.franchises_placeholder} franchise_add={this.props.franchise_add} />
        </div>

        <div>
          <GenericLabel elementfor={this.props.characters_elementid} label={this.props.characters_label} />
          
          <input id={this.props.characters_elementid} type="text" placeholder={this.props.characters_placeholder} />
        </div>
      </div>
    );
  }
});
