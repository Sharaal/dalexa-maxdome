require('dotenv').config({ silent: true });

const app = require('dexpress').app;
app.use(require('body-parser').json());

const heimdall = new (require('mxd-heimdall').Heimdall)();

app.get('/', require('./controllers/tipOfTheDay')({ heimdall }));

const skill = new (require('./dalexa').Skill)();
skill.onActions([
  require('./actions/back'),
  require('./actions/describe')({ heimdall }),
  require('./actions/more'),
  require('./actions/thanks'),
]);
skill.onIntents([
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
  require('./intents/tipOfTheDay')({ heimdall }),
]);

app.post('/', skill.getExpressHandler());
