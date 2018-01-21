import React, { Component } from 'react'
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { getMessage, addMessageAction} from '../store'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredMessage: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // TO-DO: Check if there is a need for  props will change hook in case same message entered twice
  // (no state change?)

  handleTextChange(evt) {
    this.setState({ enteredMessage: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newMessage = evt.target.newMessage.value;

    this.props.addUserMessage('Anonymos: ' + newMessage)
    this.props.getBotReply(newMessage)

    this.setState({
      enteredMessage: ''
    })
  }

render() {
  const { children, getMessage } = this.props
  return (
    <div>
      <div className='header-logo'><Image src='./fa-logo@2x.png' /> <h1> FAQ Bot</h1><Image className='bot-picture' circular src='./omri.jpg' /></div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className='chat-window' widths='equal'>
          <Form.Field name='chatWindow' id='form-textarea-control-opinion' control={TextArea} value={this.props.messages} />

        </Form.Group>
        <Form.Group widths='equal'>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleTextChange} name='newMessage' id="transcript" placeholder='Type a message..' value={this.state.enteredMessage} error />
          <Icon name='microphone'  color='teal' circular onClick={startDictation} size='large' />
        </Form.Group>
        <Button type='submit'>Send</Button>
      </Form>
    </div>
  )
}
}


// https://www.labnol.org/software/add-speech-recognition-to-website/19989/
function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    const recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (e) {
      document.getElementById('transcript').value
        = e.results[0][0].transcript;
      recognition.stop();
      document.getElementById('labnol').submit();
    };

    recognition.onerror = function (e) {
      recognition.stop();
    }

  }
}


const mapState = (state) => {
  return {
    intent: state.intent,
    messages: state.messages.join('\n')
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getBotReply(message) {
      dispatch(getMessage(message, ownProps))
    },
    addUserMessage(message) {
      dispatch(addMessageAction(message, ownProps))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))

