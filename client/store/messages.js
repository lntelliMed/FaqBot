// store/products.js

import axios from 'axios';

// Action types
const GET_MESSAGES = 'GET_MESSAGES';
const GET_MESSAGE = 'GET_MESSAGE';

// Action creators
export function getMessageAction(message) {
  return {
    type: GET_MESSAGE,
    message: message
  };
}

// Thunk creators
export function getMessage(intent) {

  return function thunk(dispatch) {
    return axios.get(`/api/messages/${intent}`)
      .then(res => res.data)
      .then(message => {
        console.log('message api', message)
        const action = getMessageAction(message);
        dispatch(action);
      })
      .catch(console.error);

  }
}

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return state;
    case GET_MESSAGE:
      return [...state, action.message]
    default:
      return state;
  }
}
