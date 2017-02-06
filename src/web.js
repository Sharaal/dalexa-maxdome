require('dotenv').config({ silent: true });

const app = require('dexpress').app;
app.use(require('body-parser').json());

const heimdall = new (require('mxd-heimdall').Heimdall)();

app.get('/', require('./controllers/tipOfTheDay')({ heimdall }));

const redis = require('dredis')(process.env.REDIS_URL);

const skill = new (require('./dalexa').Skill)();
skill.use(require('./middlewares/settings')({ redis }));
skill.onActions([
  require('./actions/back'),
  require('./actions/describe')({ heimdall }),
  require('./actions/more'),
  require('./actions/thanks'),
]);
skill.onIntents([
  require('./intents/allAreas'),
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
  require('./intents/restrictArea'),
  require('./intents/tipOfTheDay')({ heimdall }),
]);

app.post('/', skill.getExpressHandler());
