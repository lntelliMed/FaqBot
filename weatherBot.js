'use strict';

let Wit = null;
let interactive = null;

var getWeather = function (location) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=myAppID';
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
    .then(rsp => {
      var res = rsp.json();
      return res;
    })
    .then(json => {
      if (json.error && json.error.message) {
        throw new Error(json.error.message);
      }
      return json;
    });
}

try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = '4RT5H47TIDGCUPZ3WBPFRFLLLT5RTP2W'


// (() => {
//   if (process.argv.length !== 3) {
//     console.log('usage: node examples/quickstart.js <wit-access-token>');
//     process.exit(1);
//   }
//   return process.argv[2];
// })();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const { sessionId, context, entities } = request;
    const { text, quickreplies } = response;
    return new Promise(function (resolve, reject) {
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  getForecast({ context, entities }) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      return new Promise(function (resolve, reject) {
        return getWeather(location).then(weatherJson => {
          context.forecast = weatherJson.weather[0].description + ' in the ' + location;
          delete context.missingLocation;
          return resolve(context);
        })
      });
    } else {
      context.missingLocation = true;
      delete context.forecast;
      return Promise.reject(context);
    }
    return context;
  },
};

const client = new Wit({ accessToken, actions });
interactive(client);
