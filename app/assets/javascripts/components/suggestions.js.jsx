
/* Suggestions
   ============================================== */

var SuggestionsListItem = React.createClass({
  handleClick: function() {
    var argument = this.props.bindnull ? this.props.itemOnClick.bind(null, this.props.data) : this.props.itemOnClick;

    this.props.itemOnClick(argument);
  },
  render: function() {
    console.log(this.props.data);
    return <li onClick={this.handleClick}>{this.props.data.name}</li>;
  }
});

var Suggestions = React.createClass({
  propTypes: {
    suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
    showsuggestions: React.PropTypes.bool
  },
  render: function() {
    console.log(this);
    console.log(this.props.suggestions);

    var suggestions = [];
    this.props.suggestions.forEach(function(item) {
      suggestions.push( <SuggestionsListItem data={item} key={this.props.itemtype + '-' + item.id} bindnull={this.props.bindnull} itemOnClick={this.props.itemOnClick} /> );
    }.bind(this));

    return (
      <div className={ this.props.showsuggestions ? "suggestions-container active" : "suggestions-container inactive"}>
        <ul className="suggestions">
          {suggestions}
        </ul>
      </div>
    );
  }
});
