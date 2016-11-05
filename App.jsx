import React from 'react';
import Firebase from './firebase-wrapper'; // Import Firebase library
import Message from './components/Message.jsx';
import Input from './components/Input.jsx';
import style from './styles/App.less';

const App = React.createClass({
  getInitialState() {
    return {
      // messages: [] // Initialize empty list of messages
      messages: [], //Initialize an empty list of messages
      name: 'Bob',
      newMessage: ''

    };
  },

  componentWillMount() {
    Firebase.turnOn(newState => {
      this.setState(newState);
    });
  },

  componentWillUnmount() {
    Firebase.turnOff();
  },

  renderMessageDiv(message) {
    // return <p />;
    // return <p key={message.key}>{message.name}: {message.message}</p>;
    return <Message key={message.key} message={message}/>;
  },

  handleNameChange(event) {
    this.setState({name: event.target.value});
  },

  handleMessagChange(event) {
    this.setState({newMessage:event.target.value});
  },

  handleKeyPress(event) {
    const {name, newMessage} = this.state;
    //don't send blank messages
    if (!name || !newMessage) {
      return;
    }


  if (event.key === 'Enter') {
    Firebase.sendMessage({ name: name, message: newMessage});
    this.setState({newMessage: ''});
  }
},


  render() {
    // Iterates through the messages in state to create HTML elements
    // for each message
    const messageDivs = this.state.messages.map(this.renderMessageDiv);

    const {newMessage, name} = this.state;


    return (
    <div>
      <nav className="navbar">
        <div className="containter">
          <h2>ChatMe</h2>
        </div>
      </nav>
      <div className="container">
        <div className="eight columns messages">
          <div className="scrollview">
            {messageDivs}
          </div>
        </div>
        <div className="four columns">
          <Input label={'Messages'} value={newMessage} onChange={this.handleMessagChange} onKeyPress={this.handleKeyPress}/>
          <Input label={'Name'} value={name} onChange={this.handleNameChange} />
        </div>
      </div>

    </div>
    );
  }
});

export default App;
