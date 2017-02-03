const Asset = require('../models/Asset');
const Maxpert = require('../models/Maxpert');

module.exports = ({ heimdall }) => ['tipOfTheDay', async ({ response, session }) => {
  const tipOfTheDay = await heimdall.getTipOfTheDay();
  const asset = new Asset(tipOfTheDay.asset);
  const maxpert = new Maxpert(tipOfTheDay.maxpert);
  response
    .say(`Der Tipp des Tages von ${maxpert.getSay()}: ${asset.getSay()}`)
    .display(asset.getDisplay());
  session.set('assetId', asset.id);
}];
