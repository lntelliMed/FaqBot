import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import history from './history'
import {Main} from './components'

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    return (
      <Router history={history}>
        <Main>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    //
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      //
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)
