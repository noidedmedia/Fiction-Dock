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

var AddFranchiseButton = React.createClass({
  getInitialState: function() {
    return { 
      showinput: false
    };
  },
  onChange: function(e) {
    this.props.onChange(e.target.value);
  },
  handleClick: function() {
    this.setState({showinput: this.state.showinput ? 'input-hidden' : 'input-shown' }, function() {
      React.findDOMNode(this.refs.franchiseInput).focus();
    });
  },
  preventBubbling: function(e) {
    e.stopPropagation();
  },
  render: function () {
    return (
      <li>
        <div ref="addFranchiseButton" id="add-franchise-button" className={this.state.showinput ? "add-new-franchise hidden" : "add-new-franchise shown"} onClick={this.handleClick} >
          <span className="icon icon-plus"></span>
          {this.props.franchise_add}

          <input ref="franchiseInput" value={this.props.query} id={this.props.elementid} className={this.state.showinput ? 'shown' : 'hidden'} type="text" placeholder={this.props.placeholder} onClick={this.preventBubbling} onChange={this.onChange} />
        </div>

        <div className={this.props.suggestions.length > 0 ? "suggestions-container active" : "suggestions-container inactive"} >
          <ul className="suggestions">
            {this.props.suggestions.map(function(franchise, i) {
              return (
                <li key={franchise.id} data={franchise} ref={'franchise' + i}>{franchise.name}</li>
              );
            }, this)}
          </ul>
        </div>
      </li>
    );
  }
});

var FranchiseList = React.createClass({
  getInitialState: function() {
    return {
      query: "",
      suggestions: []
    };
  },
  handleChange: function(e) {
    this.setState({ query: e });

    var _this = this;

    $.ajax("/franchises/complete.json?query=" + this.state.query, {
      dataType: "json",
      error: function() {
        console.log("ERROR");
      },
      success: function(data) {

        var suggestions = [];

        data.map(function(franchise, i) {
          suggestions.push(franchise);
        });

        console.log(suggestions);

        _this.setState({ suggestions: suggestions });
      }
    });
  },
  render: function() {
    return (
      <ul className="franchise-list">

        {this.props.franchises.map(function(franchise, i) {
          return (
            <ListItem key={franchise.id} data={franchise} ref={'franchise' + i} />
          );
        }, this)}
        
        <AddFranchiseButton query={this.state.query} franchise_add={this.props.franchise_add} onChange={this.handleChange} suggestions={this.state.suggestions} />

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
