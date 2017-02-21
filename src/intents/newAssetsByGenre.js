const AssetsQueryOptions = require('drequest-maxdome').AssetsQueryOptions;
const extendsAssets = require('./extends/assets');

module.exports = ({ maxdome }) => ['newAssets', async ({ request, response, session }) => {
  const assetsQueryOptions = new AssetsQueryOptions()
    .addFilter('genre', request.get('genre'))
    .addFilter('new')
    .addSort('activeLicenseStart', 'desc');
  await extendsAssets({ assetsQueryOptions, maxdome })({ request, response, session });
}];
