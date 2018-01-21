import axios from 'axios';

// Action types
const GET_INTENT = 'GET_INTENT';

// Action creators
export function getIntentAction(intent) {
  return {
    type: GET_INTENT,
    intent: intent
  };
}

// Thunk creators
export function getIntentList(message) {
  return function thunk(dispatch) {
    const SERVER_ACCESS_TOKEN = '4RT5H47TIDGCUPZ3WBPFRFLLLT5RTP2W'
    const AuthStr = 'Bearer '.concat(SERVER_ACCESS_TOKEN)
    const URL = 'https://api.wit.ai/message?v=20180119&q='
    let intentObj = null
    return axios.get(URL + message, { headers: { Authorization: AuthStr } })
      .then(res => res.data)
      .then(data => {
        if (data.entities.intent) {
          intentObj = data.entities.intent[0]
        }
        let theIntent = ''
        if (!intentObj) {
          theIntent = 'error'
        } else {
          theIntent = intentObj.value
        }
        const action = getIntentAction(theIntent)
        dispatch(action);
      })
      .catch(console.error);
  }
}


// Reducer
export default function reducer(state = '', action) {
  switch (action.type) {
    case GET_INTENT:
      return action.intent;
    default:
      return state;
  }
}
