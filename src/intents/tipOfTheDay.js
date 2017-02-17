const Asset = require('../models/Asset');
const Maxpert = require('../models/Maxpert');

module.exports = ({ tipOfTheDay }) => ['tipOfTheDay', async ({ request, response, session }) => {
  const tipOfTheDay = await getTipOfTheDay();
  const asset = new Asset(tipOfTheDay.asset);
  const maxpert = new Maxpert(tipOfTheDay.maxpert);
  const areaRestriction = await request.settings('areaRestriction');
  if (areaRestriction === 'store') {
    response.say('Der Tipp des Tages ist für den Store nicht verfügbar.');
    return;
  }
  response
    .say(`Der Tipp des Tages von ${maxpert.getSay()}: ${asset.getSay()}`)
    .display(asset.getDisplay());
  session.shouldEndSession = false;
  session.set('assetId', asset.id);
}];
