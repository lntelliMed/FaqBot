import axios from 'axios';

// Action types
const GET_MESSAGES = 'GET_MESSAGES';
const GET_MESSAGE = 'GET_MESSAGE';
const ADD_MESSAGE = 'ADD_MESSAGE';

// Action creators
export function getMessageAction(message) {
  return {
    type: GET_MESSAGE,
    message: message
  };
}

export function addMessageAction(message) {
  return {
    type: ADD_MESSAGE,
    message: message
  };
}

// Thunk creators
export function getMessage(message) {
  return function thunk(dispatch) {
    // dispatch(addMessageAction(message));
    let intentObj = null
    return getIntent(message)
      .then(res => res.data)
      .then(data => {
        if (data.entities.intent) {
          intentObj = data.entities.intent[0]
        }
        let intent = ''
        if (!intentObj) {
          intent = 'error'
        } else {
          intent = intentObj.value
        }
        return intent
      })
      .then((intent) => axios.get(`/api/messages/${intent}`))
      .then(res => res.data)
      .then(message => {
        dispatch(getMessageAction(message))
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(message.split(':')[1]));
      })
      .catch(console.error)
  }
}

export function getIntent(message) {
    const SERVER_ACCESS_TOKEN = '4RT5H47TIDGCUPZ3WBPFRFLLLT5RTP2W'
    const AuthStr = 'Bearer '.concat(SERVER_ACCESS_TOKEN)
    const URL = 'https://api.wit.ai/message?v=20180119&q='
    return axios.get(URL + message, { headers: { Authorization: AuthStr } })
}

// Synthesis API
// https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
// export function speak(theMessage){
//   var msg = new SpeechSynthesisUtterance();
//   var voices = window.speechSynthesis.getVoices();
//   msg.voice = voices[10]; // Note: some voices don't support altering params
//   msg.voiceURI = 'native';
//   msg.volume = 1; // 0 to 1
//   msg.rate = 1; // 0.1 to 10
//   msg.pitch = 1; //0 to 2
//   msg.text = theMessage;
//   msg.lang = 'en-US';
//   msg.onend = function (e) {
//     console.log('Finished in ' + event.elapsedTime + ' seconds.');
//   };
// }

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return state;
    case GET_MESSAGE:
      return [...state, action.message]
    case ADD_MESSAGE:
      return [...state, action.message]
    default:
      return state;
  }
}
