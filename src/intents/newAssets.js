const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssets', async ({ response, session }) => {
  const pageStart = session.get('pageStart') || 1;
  const query = (new AssetsQuery())
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .query('pageSize', 1)
    .query('pageStart', pageStart)
    .sort('activeLicenseStart', 'desc');
  const assets = await heimdall.getAssets(query);
  if (assets.length === 0) {
    if (pageStart > 1) {
      response.say('Keine Inhalte vorhanden.');
    } else {
      response.say('Keine weiteren Inhalte vorhanden.');
      session.shouldEndSession = false;
      session.set('pageStart', pageStart - 1);
    }
    return;
  }
  const asset = new Asset(assets[0]);
  response
    .say(asset.getSay())
    .display(asset.getDisplay());
  session.shouldEndSession = false;
  session
    .set('assetId', asset.id)
    .set('pageStart', pageStart);
}];
