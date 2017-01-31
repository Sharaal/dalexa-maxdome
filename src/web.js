require('dotenv').config({ silent: true });

const app = require('dexpress')();
app.use(require('body-parser').json());

const heimdall = new (require('mxd-heimdall').Heimdall)();

const skill = new (require('dalexa').Skill)();
skill.onIntents([
  require('./intents/newAssets')({ heimdall }),
  require('./intents/newAssetsByGenre')({ heimdall }),
]);

app.post('/', skill.getExpressHandler());
