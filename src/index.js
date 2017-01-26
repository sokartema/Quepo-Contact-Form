const React = require('react');
const ReactDOM = require('react-dom');

const ContactView = require('./contact-view');

const newContact = {

  email: "",
  subject: "",
  message: ""
}

ReactDOM.render(<ContactView newContact={newContact}/>, document.getElementById('react-form'));
