/* Create New Story/Edit Story JavaScript
 * Page is highly dynamic, so we went with using React.js for this.
 * If you can't figure out where a property is coming from, it may have been passed
 * by the react_component helper used by the react-rails gem.
*/
// ReactFormElements component used in the Rails view.
var StoryForm = React.createClass({
  propTypes: {
    franchises: React.PropTypes.arrayOf(React.PropTypes.object),
    characters: React.PropTypes.arrayOf(React.PropTypes.object),
    ships: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  getInitialState: function() {
    // "Global" values for the franchises, characters, and ships
    // passed when submitting the story.
    return {
      franchises: this.props.franchises,
      characters: this.props.characters,
      ships: this.props.ships
    };
  },
  addFranchise: function(franchise){
    var f = this.state.franchises;
    f.push(franchise);
    this.setState({
      franchises: f
    });
  },
  removeFranchise: function(franchise){
    var rem = this.state.franchises.filter(function(f){
      return franchise.id !== f.id;
    });
    this.setState({
      franchises: rem
    });
  },
  // Adds a character to the characters state.
  addCharacter: function(character) {
    var characters = this.state.characters;
    characters.push(character);
    console.log(characters);
    // Passes the updated characters array to the characters state.
    this.setState({ characters: characters });
  },
  // Removes a character from the characters state.
  removeCharacter: function(character) {
    console.log('removing character',character);
    // Creates a new array out of the characters state
    // without the character we're removing.
    var characters = this.state.characters.filter(function(c) {
      return character.id !== c.id;
    });
    console.log(characters);
    this.setState({ characters: characters });
  },
  addShip: function(e){
    e.preventDefault();
    var s = this.state.ships;
    s.push({
      characters: []
    });
    this.setState({
      ships: s 
    });
  },
  removeShip: function(ship){
    var s = this.state.ships;
    delete s[s.indexOf(ship)];
    this.setState({
      ships: s
    });
    
  },
  updateShips: function(ships) {
    var newships = [];

    // All the ships already in the React state are pushed to the newships array.
    this.state.ships.forEach(function(ship, i) {
      newships.push(ship);
    });

    // New ships passed to updateShips are then added to the newships array.
    ships.forEach(function(ship, i) {
      newships.push(ship);
    });
    
    // The React state is updated to reflect the newships array we've just created.
    this.setState({ ships: newships });
  },
  render: function() {
    // All properties passed from the Rails helper are forwarded onto
    // the Franchises component by the {...this.props} line.
    //
    console.log("rendering form people");
    console.log(this.props);
    return (
      <div>
        {/* The franchises property must be declared after the {...this.props}
            to prevent the franchises from being overridden by the franchises
            property forwarded from the Rails helper. */}
        {this.state.franchises.map(function(f){
          var active_characters = this.state.characters.filter(function(c){
            return c.franchise_id === f.id;
          });
          var inactive_characters = f.characters.filter(function(c){
            // Take all characters from active_characters with an id that
            // matchies this character's id. If we get none, the character 
            // is not active, and, thus, inactive.
            return active_characters.filter(function(ch){
              return ch.id === c.id;
            }).length === 0
          })
          return <FormFranchise active_characters={active_characters} inactive_characters={inactive_characters} removeCharacter={this.removeCharacter} addCharacter={this.addCharacter} {...f} />;
        }.bind(this))}
        {this.state.characters.length > 1 ? <AddShipButton addShip={this.addShip} /> : <div></div>}
        {this.state.ships.map(function(ship, i){
          return <FormShip {...ship} potential_characters={this.state.characters} key={i} onRemove={this.removeShip} reactKey={i} />
        }.bind(this))}
        <SubmitButton submit={this.props.submit} elementid={this.props.submit_elementid} characters={this.state.characters} franchises={this.state.franchises} />
      </div>
    );
  }
});



/* ListItem
   ============================================== */

/* Used to list the Franchises and Characters items.
 * Styles differ between Franchise ListItems and Character ListItems
 * because they're placed in different containers.
 */
var ListItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object,
    remove: React.PropTypes.func
  },
  // Sends data to parent component depending on what function was sent in the
  // "remove" property for the ListItem component.
  handleDelete: function(e) {
    this.props.remove(this.props.data);
  },
  render: function() {
    return (
      <li>
        <div>
          <span className="icon icon-close" onClick={this.handleDelete}></span>

          {this.props.data.name}
        </div>
      </li>
    );
  }
});



/* Submit Button
   ============================================== */

// This intervenes and handles the submission of the story form.
var SubmitButton = React.createClass({
  // Function is run when the submit input is clicked.
  handleClick: function(e) {
    // Prevents default HTML input submission flow from occurring.
    e.preventDefault();

    // A "Story" object is created to pass data to.
    var Story = {};

    // The storyid is derived from the story-form element's
    // "data-story-id" attribute.
    var storyid = $("#story-form").data("story-id");

    // Takes the name, language, license, blurb, and description values
    // from their respective input fields/spinners.
    // Each is made to be a property of the Story object created above.
    Story.name = $("#story-name-field").val();
    Story.language = $("#story-language-select").val();
    Story.license = $("#story-license-select").val();
    Story.blurb = $("#story-blurb-field").val();
    Story.description = $("#story-description-field").val();

    // An array is created out of the franchises passed from parent components
    // and then made a property of the Story object.
    Story.franchise_ids = this.props.franchises.map(function(franchise) {
      return franchise.id;
    });

    // Ditto above, albeit with characters instead of franchises.
    Story.character_ids = this.props.characters.map(function(character) {
      return character.id;
    });

    console.log(Story);
    console.log(storyid);

    console.log(JSON.stringify(Story));

    // Our Rails backend requests that the story be submitted in the form of
    //
    // {
    //    story: {
    //      *properties go here*
    //    }
    // }
    //
    // So the Story object is converted into that format.
    Story = {story: Story};

    console.log(JSON.stringify(Story));

    // Depending on whether or not the storyid variable returns null,
    // meaning that no story ID was present when the form was created,
    // the method used in the AJAX submission is either "PUT" or "POST",
    // depending on whether or not the story is being created or edited.
    var method = storyid ? "PUT" : "POST";

    console.log(method);

    // AJAX is used to submit the story as JSON.
    $.ajax("/stories/" + storyid, {
      dataType: "json",
      data: JSON.stringify(Story),
      contentType: "application/json; encoding=utf-8",
      method: method,
      // If the AJAX request responds with a success header, the user is
      // redirected to the page for the story they've just submitted.
      success: function(data) {
        window.location.href = "/stories/" + data.id;
      },
      // Otherwise throw some errors.
      error: function(error) {
        console.log(error);
        console.log(JSON.parse(error.responseText));
      }
    });
  },
  render: function() {
    return (
      <div>
        <input type="submit" name="commit" value={this.props.submit} id={this.props.elementid} onClick={this.handleClick} />
      </div>
    );
  }
});
