const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssets', async ({ response, session }) => {
  const query = (new AssetsQuery())
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .query('pageSize', 1)
    .sort('activeLicenseStart', 'desc');
  const assets = await heimdall.getAssets(query);
  const asset = new Asset(assets[0]);
  response
    .say(asset.getSay())
    .display(asset.getDisplay());
  session.set('assetId', asset.id);
}];
