const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['describe', async ({ response, session }) => {
  const assetId = session.get('assetId');
  if (!assetId) {
    response.say('Es wurde in dieser Session noch kein Asset angefragt.');
    return;
  }
  const query = new AssetsQuery(assetId);
  const assets = await heimdall.getAssets(query);
  if (assets.length === 0) {
    response.say('Das zuletzt angefragt Asset ist nicht mehr vorhanden.');
    return;
  }
  const asset = new Asset(assets[0]);
  response.say(asset.getSay({ description: true }));
  session.keep();
}];
