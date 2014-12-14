// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require showdown



var React = require('react');
var Router = require('react-router');
var Route = require('react-router').Route;

var App = require('app');
var Comments = require('comments');
var Home = require('home');
var Inbox = require('inbox');
var NotFound = require('not-found');


$(function() {
  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="inbox" handler={Inbox}/>
      <Route name="comments" handler={Comments}/>
      <Router.DefaultRoute handler={Home}/>
      <Router.NotFoundRoute handler={NotFound}/>
    </Route>
  );

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
