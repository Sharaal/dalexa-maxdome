const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssetsByGenre', async ({ request, response }) => {
  const query = (new AssetsQuery())
    .filter('genre', request.get('genre'))
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .query('pageSize', 1)
    .sort('activeLicenseStart', 'desc');
  const assets = heimdall.getAssets(query)
  if (assets.length > 0) {
    const asset = new Asset(assets[0]);
    response
      .say(asset.getSay())
      .display(asset.getDisplay());
    session.set('assetId', asset.id);
  } else {
    response.say('Keine Inhalte vorhanden.');
  }
}];
