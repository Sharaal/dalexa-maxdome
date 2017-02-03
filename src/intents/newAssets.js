const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssets', async ({ response, session }) => {
  const query = (new AssetsQuery())
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .query('pageSize', 1)
    .query('pageStart', session.get('pageStart'))
    .sort('activeLicenseStart', 'desc');
  const assets = await heimdall.getAssets(query);
  if (assets.length === 0) {
    response.say('Keine Inhalte vorhanden.');
    return;
  }
  const asset = new Asset(assets[0]);
  response
    .say(asset.getSay())
    .display(asset.getDisplay());
  session.set('startIntent', 'newAssets');
  session.set('assetId', asset.id);
}];
