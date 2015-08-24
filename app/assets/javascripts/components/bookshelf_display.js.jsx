var ViewMoreInformation = React.createClass({
  render: function() {
    return (
      <div className="more-information">
        <div className="view-more-information-button">{this.props.translations.view_more_information}</div>
      </div>
    );
  }
});

var BookshelfList = React.createClass({
  render: function() {
    return (
      <ul className="bookshelf-display-list">
        {this.props.bookshelves.map(function(b) {
          return <BookshelfListItem {...b} key={b.id}  />;
        })}
      </ul>
    );
  }
});

var BookshelfListItem = React.createClass({
  render: function() {
    return (
      <li>
        <a className="bookshelf-name" href={this.props.url}>
          {this.props.name}
        </a>
      </li>
    );
  }
});
