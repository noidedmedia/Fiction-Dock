
/* Suggestions
   ============================================== */

var SuggestionsListItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },
  render: function() {
    console.log(this.props.itemOnClick);
    console.log(this.props.data);
    return <li data={this.props.data} onClick={this.props.itemOnClick}>{this.props.data.name}</li>;
  }
});

var Suggestions = React.createClass({
  propTypes: {
    suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
    showsuggestions: React.PropTypes.bool
  },
  render: function() {
    console.log("SUGGESTIONS:");
    console.log(this.props.suggestions);
    return (
      <div className={ this.props.showsuggestions ? "suggestions-container active" : "suggestions-container inactive"}>
        <ul className="suggestions">
          {this.props.suggestions.map(function(item) {
            return <SuggestionsListItem data={item} key={this.props.itemtype + '-' + item.id} itemOnClick={ this.props.bindnull ? this.props.itemOnClick.bind(null, item) : this.props.itemOnClick } />;
          }.bind(this))}
        </ul>
      </div>
    );
  }
});
