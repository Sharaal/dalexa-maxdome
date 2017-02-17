const AssetsQueryOptions = require('drequest-maxdome').AssetsQueryOptions;
const Asset = require('../models/Asset');

module.exports = ({ maxdome }) => ['newAssetsByGenre', async ({ request, response, session }) => {
  const pageStart = session.get('pageStart') || 1;
  const assetsQueryOptions = new AssetsQueryOptions()
    .addFilter('genre', request.get('genre'))
    .addFilter('movies')
    .addFilter('new')
    .addFilter('notUnlisted')
    .addQuery('pageSize', 1)
    .addQuery('pageStart', pageStart)
    .addSort('activeLicenseStart', 'desc');
  const areaRestriction = await request.settings('areaRestriction');
  if (areaRestriction) {
    assetsQueryOptions.addFilter(areaRestriction);
  }
  const assets =
    await maxdome.request('assets')
      .send(assetsQueryOptions);
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
