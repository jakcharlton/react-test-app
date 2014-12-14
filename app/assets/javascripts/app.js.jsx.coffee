React = require('react')
Router = require('react-router')

App = React.createClass
  render: ->
    <div className='container'>
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Router.Link to='app'>Home</Router.Link></li>
              <li><Router.Link to='inbox'>Inbox</Router.Link></li>
              <li><Router.Link to='comments'>Comments</Router.Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <Router.RouteHandler/>
    </div>

module.exports = App