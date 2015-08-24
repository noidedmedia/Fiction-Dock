var AddToBookshelves = React.createClass({
  propTypes: {
    bookshelves_with: React.PropTypes.arrayOf(React.PropTypes.object),
    bookshelves_without: React.PropTypes.arrayOf(React.PropTypes.object),
    story: React.PropTypes.object
  },
  getInitialState: function() {
    var bookshelves = [];

    this.props.bookshelves_with.forEach(function(b) {
      b.with = true;
      bookshelves.push(b);
    });
    this.props.bookshelves_without.forEach(function(b) {
      b.with = false;
      bookshelves.push(b);
    });

    return ({
      active: false,
      bookshelves: bookshelves
    });
  },
  toggleActive: function(e) {
    e.preventDefault();
    
    if (this.state.active) {
      this.setState({active: false});
    } else {
      this.setState({active: true});
    }
  },
  addStoryToBookshelf: function(bookshelf) {

    $.ajax("/bookshelves/" + bookshelf.id + "/add", {
      dataType: "json",
      data: {story: {id: this.props.story.id}},
      method: "POST",
      success: function(data) {
        var index = this.state.bookshelves.indexOf(bookshelf);
        this.state.bookshelves[index].with = true;

        this.setState({bookshelves: this.state.bookshelves});
      }.bind(this),
      error: function(data) {
        console.log("Error");
        console.log(data);
      }
    });
  },
  removeStoryFromBookshelf: function(bookshelf) {

    $.ajax("/bookshelves/" + bookshelf.id + "/remove", {
      dataType: "json",
      data: {story: {id: this.props.story.id}},
      method: "DELETE",
      success: function(data) {
        var index = this.state.bookshelves.indexOf(bookshelf);
        this.state.bookshelves[index].with = false;

        this.setState({bookshelves: this.state.bookshelves});
      }.bind(this),
      error: function(data) {
        console.log("Error");
        console.log(data);
      }
    });
  },
  render: function() {
    return (
      <li className={ this.state.active ? "add-to-bookshelves active" : "add-to-bookshelves" }>
        <a href="#" onClick={this.toggleActive}>{this.props.translations.add_to_bookshelves}</a>

        <div>
          <ul>
            {this.state.bookshelves.map(function(bookshelf) {
              return (
                <AddToBookshelvesListItem
                  key={bookshelf.id}
                  bookshelf={bookshelf}
                  includesStory={bookshelf.with}
                  addStoryToBookshelf={this.addStoryToBookshelf}
                  removeStoryFromBookshelf={this.removeStoryFromBookshelf}
                />
              );
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
    addStoryToBookshelf: React.PropTypes.func,
    removeStoryFromBookshelf: React.PropTypes.func
  },
  render: function() {
    var onClickCallbackAdd = function() {
      this.props.addStoryToBookshelf(this.props.bookshelf);
    }.bind(this);
    
    var onClickCallbackRemove = function() {
      this.props.removeStoryFromBookshelf(this.props.bookshelf);
    }.bind(this);

    if (this.props.includesStory) {
      return (
        <li className="bookshelf-remove" onClick={onClickCallbackRemove}>
          <span className="icon icon-close"></span>
          {this.props.bookshelf.name}
        </li>
      );
    } else {
      return (
        <li className="bookshelf-add" onClick={onClickCallbackAdd}>
          <span className="icon icon-plus"></span>
          {this.props.bookshelf.name}
        </li>
      );
    }
  }
});
