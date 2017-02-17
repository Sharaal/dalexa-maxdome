require('dotenv').config({ silent: true });

const app = require('dexpress').app;

const RequestBuilder = require('drequest').RequestBuilder;
const { AssetsOptions, MaxdomeOptions } = require('drequest-maxdome');

const maxdome =
  new RequestBuilder()
    .setOptions('maxdome', new MaxdomeOptions())
    .addNames('maxdome')
    .setOptions('assets', new AssetsOptions());
const tipOfTheDay = require('./utils/tipOfTheDay')({ maxdome });

const redis = require('dredis')(process.env.REDIS_URL);

require('dcontrollers')(app, [
  require('./controllers/tipOfTheDay')({ tipOfTheDay }),
  require('./controllers/oauth')({ maxdome, redis }),
]);

const skill = new (require('dalexa').Skill)();
skill.use(require('./middlewares/linkedAccount')({ maxdome, redis }));
skill.use(require('./middlewares/settings')({ redis }));
skill.onActions([
  require('./actions/back'),
  require('./actions/describe')({ maxdome }),
  require('./actions/more'),
  require('./actions/notepad')({ maxdome }),
  require('./actions/thanks'),
]);
skill.onIntents([
  require('./intents/allAreas'),
  require('./intents/newAssets')({ maxdome }),
  require('./intents/newAssetsByGenre')({ maxdome }),
  require('./intents/restrictArea'),
  require('./intents/tipOfTheDay')({ tipOfTheDay }),
]);

app.post('/', require('body-parser').json(), skill.getExpressHandler());
