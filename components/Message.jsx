import React from 'react';
import * as emoji from 'node-emoji';

const Message = React.createClass({
  // Setting propTypes ensure that your component is used correctly
  propTypes: {
    message: React.PropTypes.object
  },

  render() {
  	//Destructuring
  	//message object
  	const {name, message} = this.props.message;

  	// return <p>{name}: {message}</p>
    const emojifiedString = emoji.emojify(message);
    return <p>{name}: {emojifiedString}</p>;
  }
});

export default Message;
