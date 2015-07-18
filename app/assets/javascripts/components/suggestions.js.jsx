
/* Suggestions
   ============================================== */

var Suggestions = React.createClass({
  render: function() {
    return (
      <div className={this.props.suggestions.length > 0 ? "suggestions-container active" : "suggestions-container inactive"}>
        <ul className="suggestions">
          {this.props.suggestions.map(function(item, i) {
            return (
              <li key={this.props.itemtype + '-' + item.id} data={item} onClick={this.props.itemOnClick.bind(null, item)}>{item.name}</li>
            );
          }, this)}
        </ul>
      </div>
    );
  }
});
