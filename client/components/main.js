import React, { Component } from 'react'
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
// import ChatBubble from 'react-chat-bubble'
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.myProp !== this.props.myProps) {
  //     // nextProps.myProp has a different value than our current prop
  //     // so we can perform some calculations based on the new value
  //     scrollToBottom('scrollable-list')
  //   }
  // }

  // componentWillUpdate(nextProps, nextState) {
    // if (nextState.open == true && this.state.open == false) {
    //   this.props.onWillOpen();
    // }
    // scrollToBottom('scrollable-list')
    // document.getElementById('scrollable-list').scrollIntoView(false);
  // }


  // TO-DO: Check if there is a need for  props will change hook in case same message entered twice
  // (no state change?)

  handleTextChange(evt) {
    this.setState({ enteredMessage: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newMessage = evt.target.newMessage.value;

    // this.props.addUserMessage('Anonymos: ' + newMessage)
    this.props.addUserMessage(newMessage)
    this.props.getBotReply(newMessage)

    this.setState({
      enteredMessage: ''
    })

    // document.getElementById('scrollable-list').scrollIntoView(false);
    try{
      scrollToBottom('scrollable-list')
    } catch (err){
      console.error(err)
    }
  }


render() {
  const { children, getMessage } = this.props
  return (
    <div>
      <div className='header-logo'>
        <Image className='header-fs-picture' src='./fa-logo@2x.png' />
        <h1> FAQ Bot</h1>
        <Image className='header-bot-picture' circular src='./omri.jpg' />
      </div>

      <Form onSubmit={this.handleSubmit}>
        <ul className='chat-window' id='scrollable-list'>
          {this.props.messages.map((message, index) => {
            return (
              <div className='switch-direction' key={index}>
                {/* <Image className={index % 2 === 0 ? 'chat-picture' : 'switch-picture-position'} bordered circular src={index % 2 === 0 ? './guest.png' : './bot.png'} /> */}
                <Image className='chat-picture' bordered circular src={index % 2 === 0 ? './guest.png' : './bot.png'} />
                <div className='chat-bubble' > {message} </div>
                {/* <li className='chat-bubble' > {message} </li> */}
                {/* <Form.Input className='chat-bubble' placeholder='Type a message..' value={message} /> */}
              </div>
            )
          })}
        </ul>
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

function scrollToBottom(id) {
  var div = document.getElementById(id);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

const mapState = (state) => {
  return {
    intent: state.intent,
    // messages: state.messages.join('\n')
    messages: state.messages
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

