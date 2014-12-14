React = require('react');

RB = require('react-bootstrap');
Button = require('react-bootstrap/button');

Inbox = React.createClass
  test: ->
    r = 1 + 4

  render: ->
    <div>
      <h1>This is Inbox of {@test()}</h1>
      <RB.ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <RB.DropdownButton title="Dropdown">
          <RB.MenuItem eventKey="1">Dropdown link</RB.MenuItem>
          <RB.MenuItem eventKey="2">Dropdown link</RB.MenuItem>
        </RB.DropdownButton>
      </RB.ButtonGroup>
    </div>
module.exports = Inbox