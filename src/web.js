require('dotenv').config({ silent: true });

const app = require('dexpress').app;

const heimdall = new (require('mxd-heimdall').Heimdall)();
const redis = require('dredis')(process.env.REDIS_URL);

require('dcontrollers')(app, [
  require('./controllers/tipOfTheDay')({ heimdall }),
  require('./controllers/oauth')({ heimdall, redis }),
]);

const skill = new (require('dalexa').Skill)();
skill.use(require('./middlewares/linkedAccount')({ heimdall, redis }));
skill.use(require('./middlewares/settings')({ redis }));
skill.onActions([
  require('./actions/back'),
  require('./actions/describe')({ heimdall }),
  require('./actions/more'),
  require('./actions/notepad')({ heimdall }),
  require('./actions/thanks'),
]);
skill.onIntents([
  require('./intents/allAreas'),
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
  require('./intents/restrictArea'),
  require('./intents/tipOfTheDay')({ heimdall }),
]);

app.post('/', require('body-parser').json(), skill.getExpressHandler());
