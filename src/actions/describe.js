const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['describe', (lastIntent) => async ({ response, session }) => {
  session.keep();
  const assetId = session.get('assetId');
  if (!assetId) {
    response.say('Es wurde in dieser Session noch kein Asset angefragt.');
    return;
  }
  const query = new AssetsQuery(assetId);
  const assets = await heimdall.getAssets(query);
  if (assets.length === 0) {
    response.say('Das zuletzt angefragte Asset ist nicht mehr vorhanden.');
    return;
  }
  const asset = new Asset(assets[0]);
  response.say(asset.description);
}];
