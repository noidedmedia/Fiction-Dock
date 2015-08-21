var AddToBookshelves = React.createClass({
  propTypes: {
    bookshelves: React.PropTypes.arrayOf(React.PropTypes.object),
    story: React.PropTypes.object
  },
  addStoryToBookshelf: function(e) {
    console.log(e);
    console.log(this.props.story.id);

    $.ajax("/bookshelves/" + bookshelf.id, {

    });
  },
  render: function() {
    return (
      <li>
        {this.props.translations.add_to_bookshelves}

        <div>
          <ul>
            {this.props.bookshelves.map(function(bookshelf) {
              return <AddToBookshelvesListItem key={bookshelf.id} bookshelf={bookshelf} addStoryToBookshelf={this.addStoryToBookshelf} />;
            }.bind(this))}
          </ul>
        </div>
      </li>
    );
  }
});

var AddToBookshelvesListItem = React.createClass({
  propTypes: {
    bookshelf: React.PropTypes.object
  },
  render: function() {
    return <li onClick={ this.props.addStoryToBookshelf }>{this.props.bookshelf.name}</li>;
  }
});