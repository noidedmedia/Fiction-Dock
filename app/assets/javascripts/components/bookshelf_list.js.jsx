var AddToBookshelves = React.createClass({
  propTypes: {
    bookshelves: React.PropTypes.arrayOf(React.PropTypes.object),
    story: React.PropTypes.object
  },
  addStoryToBookshelf: function(bookshelf) {
    console.log(this.props.story.id);
    console.log(bookshelf);
    console.log(bookshelf.id);

    $.ajax("/bookshelves/" + bookshelf.id + "/add", {
      dataType: "json",
      data: {story: {id: this.props.story.id}},
      method: "POST",
      success: function(data) {
        console.log("Success!");
        console.log(data);
      },
      error: function(data) {
        console.log("Goof'd!");
        console.log(data);
      }
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
    bookshelf: React.PropTypes.object,
    addStoryToBookshelf: React.PropTypes.func
  },
  render: function() {
    var onClickCallback = function() {
      this.props.addStoryToBookshelf(this.props.bookshelf);
    }.bind(this);
    return <li onClick={onClickCallback}>{this.props.bookshelf.name}</li>;
  }
});