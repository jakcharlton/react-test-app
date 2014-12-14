var React = require('react');
var RB = require('react-bootstrap');
var Router = require('react-router');


var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: 'comments.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: 'comments.json',
      dataType: 'json',
      type: 'POST',
      data: { comment: comment },
      success: function(data) {
        var comments = this.state.data;
        comments.unshift(comment);
        this.setState({data: comments});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <div>
    <RB.ButtonGroup>
      <RB.Button>1</RB.Button>
      <RB.Button>2</RB.Button>
      <RB.DropdownButton title="Dropdown">
        <RB.MenuItem eventKey="1">Dropdown link</RB.MenuItem>
        <RB.MenuItem eventKey="2">Dropdown link</RB.MenuItem>
      </RB.DropdownButton>
    </RB.ButtonGroup>
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <RB.Button bsStyle="primary" type='submit'>Primary</RB.Button>
      </form>
      </div>
    );
  }
});


var Home = React.createClass({
  render: function () {
    return (
      <div><h1>Home Page</h1></div>
      );
  }
});

var Inbox = React.createClass({
  render: function () {
    return (
      <div><h1>Your Inbox</h1></div>
      );
  }
});

var NotFound = React.createClass({
  render: function () {
    return (
      <div><h1>404</h1></div>
      );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Router.Link to="app">Home</Router.Link></li>
            <li><Router.Link to="inbox">Inbox</Router.Link></li>
            <li><Router.Link to="comments">Comments</Router.Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <Router.RouteHandler/>
      </div>
    );
  }
});

$(function() {
  var routes = (
    <Router.Route name="app" path="/" handler={App}>
      <Router.Route name="inbox" handler={Inbox}/>
      <Router.Route name="comments" handler={CommentBox}/>
      <Router.DefaultRoute handler={Home}/>
      <Router.NotFoundRoute handler={NotFound}/>
    </Router.Route>
  );

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});

