
/* Suggestions
   ============================================== */

var SuggestionsListItem = React.createClass({
  render: function() {
    return <li onClick={this.props.onClick}>{this.props.data.name}</li>;
  }
});

var Suggestions = React.createClass({
  render: function() {
    return (
      <div className={ this.props.showsuggestions ? "suggestions-container active" : "suggestions-container inactive"}>
        <ul className="suggestions">
          {this.props.suggestions.map(function(item, i) {
            return <SuggestionsListItem key={this.props.itemtype + '-' + item.id} data={item} onClick={ this.props.bindnull ? this.props.itemOnClick.bind(null, item) : this.props.itemOnClick } />;
          }, this)}
        </ul>
      </div>
    );
  }
});
