var AddToBookshelves = React.createClass({
  propTypes: {
    bookshelves: React.PropTypes.arrayOf(React.PropTypes.object),
    story: React.PropTypes.object
  },
  render: function() {
    return (
      <li>
        {this.props.translations.add_to_bookshelves}

        <div>
          <ul>
            {this.props.bookshelves.map(function(bookshelf, i) {
              return <li key={bookshelf.id} onClick={this.addStoryToBookshelf}>{bookshelf.name}</li>;
            }.bind(this))}
          </ul>
        </div>
      </li>
    );
  }
});
