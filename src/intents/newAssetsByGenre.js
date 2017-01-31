const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['newAssetsByGenre', async ({ request, response }) => {
  const query = (new AssetsQuery())
    .filter('genre', request.get('genre'))
    .filter('movies')
    .filter('new')
    .filter('notUnlisted')
    .sort('activeLicenseStart', 'desc');
  const assets = heimdall.getAssets(query)
  if (assets.length > 0) {
    new Asset(assets[0]).render(response);
  } else {
    response.say('Keine Inhalte vorhanden');
  }
}];
