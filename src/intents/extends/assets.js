const Asset = require('../../models/Asset');

module.exports = ({ assetsQueryOptions, maxdome }) => async ({ request, response, session }) => {
  const pageStart = session.get('pageStart') || 1;
  assetsQueryOptions
    .addFilter('contentTypeSeriesOrMovies')
    .addQuery('pageSize', 1)
    .addQuery('pageStart', pageStart);
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
};
