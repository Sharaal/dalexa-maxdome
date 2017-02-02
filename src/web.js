require('dotenv').config({ silent: true });

const app = require('dexpress').app;
app.use(require('body-parser').json());

const heimdall = new (require('mxd-heimdall').Heimdall)();

const skill = new (require('./lib').Skill)();
skill.onIntents([
  require('./intents/descripeLastAsset')({ heimdall }),
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
]);

app.post('/', skill.getExpressHandler());
