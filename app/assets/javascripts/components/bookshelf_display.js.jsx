var BookshelfList = React.createClass({
  render: function(){
    return (
      <ul className="bookshelf-display-list">
        {this.props.bookshelves.map(function(b){
          return <BookshelfItem {...b} key={b.id}  />;
        })}
      </ul>);
  }
});
var BookshelfItem = React.createClass({
  render: function(){
    return (
      <li>
        <a className="bookshelf-name" 
          href={this.props.url}>
          {this.props.name}
        </a>
      </li>
    );
  }
});
