var AddToBookshelves = React.createClass({
  propTypes: {
    bookshelves: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  getInitialState: function() {
    return {
      bookshelves: this.props.bookshelves
    };
  },
  render: function() {
    return (
      <li>
        {this.props.translations.add_to_bookshelves}

        <div>
          <ul>
            {this.state.bookshelves.map(function(bookshelf, i) {
              return <li>{bookshelf.name}</li>;
            })}
          </ul>
        </div>
      </li>
    );
  }
});
