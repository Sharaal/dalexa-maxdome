const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssets', async ({ response }) => {
  const query = (new AssetsQuery())
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .query('pageSize', 1)
    .sort('activeLicenseStart', 'desc');
  const assets = await heimdall.getAssets(query);
  new Asset(assets[0]).render(response);
}];
