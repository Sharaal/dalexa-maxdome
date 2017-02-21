const AssetsQueryOptions = require('drequest-maxdome').AssetsQueryOptions;
const extendsAssets = require('./extends/assets');

module.exports = ({ maxdome }) => ['newAssets', async ({ request, response, session }) => {
  const assetsQueryOptions = new AssetsQueryOptions()
    .addFilter('search', request.get('name'));
  await extendsAssets({ assetsQueryOptions, maxdome })({ request, response, session });
}];
