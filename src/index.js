const Router = require('./router');

const downHandler = require('./down');
const upHandler = require('./up');
const pingHandler = require('./ping');
const optionCORSHandler = require('./CORS');
const ipHandler = require('./ip');

const {
  indexHandler,
  speedtestHandler,
  speedtestWorkerHandler
} = require('./serve-public');

async function handleRequest(request) {
  const r = new Router();

  r.get('/', indexHandler);
  r.get('/speedtest.js', speedtestHandler);
  r.get('/speedtest_worker.js', speedtestWorkerHandler);

  r.get('.*/down', downHandler);
  r.post('.*/up', upHandler);
  r.get('.*/ping', pingHandler);
  r.get('.*/ip', ipHandler);
  r.options('.*/up', optionCORSHandler);

  return await r.route(request);
}

// CF worker require
module.exports = handleRequest;
