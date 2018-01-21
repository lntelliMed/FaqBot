import React, { Component } from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getIntentList, getMessage} from '../store'

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

    // console.log('intent before', this.props.intent)


    this.setState({
      enteredMessage: ''
    })

    this.props.getIntent(newMessage)

    if (this.props.intent){
      const newIntent = this.props.intent;

      this.props.getBotReply(newIntent)
    }


  }

render() {
  const { children, getIntent, getMessage, intent } = this.props
  return (
    <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field name='chatWindow' id='form-textarea-control-opinion' control={TextArea} value={this.props.messages} />

        </Form.Group>
        <Form.Group widths='equal'>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input onChange={this.handleTextChange} name='newMessage'  placeholder='Type a message..' value={this.state.enteredMessage} error />
        </Form.Group>
        <Button type='submit'>Send</Button>
      </Form>
    </div>
  )
}
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    intent: state.intent,
    messages: state.messages.join('\n')
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getBotReply(intentValue) {
      console.log('intentValue', intentValue)
      dispatch(getMessage(intentValue, ownProps))
    }
    ,
    getIntent(newMessage) {
      console.log('newMessage', newMessage)

      dispatch(getIntentList(newMessage, ownProps));
    },

  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))

