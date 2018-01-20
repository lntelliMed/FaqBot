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

  handleTextChange(evt) {
    this.setState({ enteredMessage: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newMessage = evt.target.newMessage.value;
    this.setState({
      enteredMessage: ''
    })
    console.log('intent before', this.props.intent)

    this.props.getIntent(newMessage)
    // this.props.getMessage(this.props.intent.value)
    console.log('intent received',this.props.intent)
    this.props.getMessage('undefined')
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
    getIntent(newMessage) {
      dispatch(getIntentList(newMessage, ownProps));
    },
    getMessage(intentValue) {
      dispatch(getMessage(intentValue, ownProps))
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))

