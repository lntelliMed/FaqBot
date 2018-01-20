'use strict';

let { Wit, interactive} = require('node-wit');

if (process.env.NODE_ENV !== 'production') require('./secrets')


const accessToken = process.env.ACCESS_TOKEN || 'SOMEINVALIDTOKEN'

// See https://wit.ai/lntelliMed/FullstackFaqBot/entities

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
    ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const { sessionId, context, entities } = request;
    const { text, quickreplies } = response;
    console.log('sending...', JSON.stringify(response));
  },
  getForecast({ context, entities }) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.forecast = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },
};

const client = new Wit({ accessToken, actions });
interactive(client);
