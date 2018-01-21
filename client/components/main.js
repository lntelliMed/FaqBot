import React, { Component } from 'react'
import { Button, Form, TextArea, Icon } from 'semantic-ui-react'
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


  // Use  props will change hook in case same message entered twice??

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
      <h2>Fullstack FAQ Bot</h2>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field name='chatWindow' id='form-textarea-control-opinion' control={TextArea} value={this.props.messages} />

        </Form.Group>
        <Form.Group widths='equal'>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleTextChange} name='newMessage' id="transcript" placeholder='Type a message..' value={this.state.enteredMessage} error />
          <Icon name='microphone' inveted color='teal' circular onClick={startDictation} size='large' />
        </Form.Group>
        <Button type='submit'>Send</Button>
      </Form>
    </div>
  )
}
}


function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

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

