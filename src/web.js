require('dotenv').config({ silent: true });

const app = require('dexpress').app;
app.use(require('body-parser').json());

const heimdall = new (require('mxd-heimdall').Heimdall)();

require('dcontrollers')(app, [
  require('./controllers/tipOfTheDays')({ heimdall }),
]);

const skill = new (require('./dalexa').Skill)();
skill.onIntents([
  require('./intents/descripeLastAsset')({ heimdall }),
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
  require('./intents/tipOfTheDays')({ heimdall }),
]);

app.post('/', skill.getExpressHandler());
