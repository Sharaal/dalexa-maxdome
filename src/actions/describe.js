const AssetsQueryOptions = require('drequest-maxdome').AssetsQueryOptions;
const Asset = require('../models/Asset');

module.exports = ({ maxdome }) => ['describe', () => async ({ response, session }) => {
  session.shouldEndSession = false;
  const assetId = session.get('assetId');
  if (!assetId) {
    response.say('Es wurde in dieser Session noch kein Asset angefragt.');
    return;
  }
  const assets =
    await maxdome.request('assets')
      .send(new AssetsQueryOptions(assetId));
  if (assets.length === 0) {
    response.say('Das zuletzt angefragte Asset ist nicht mehr vorhanden.');
    return;
  }
  const asset = new Asset(assets[0]);
  response.say(asset.description);
}];
