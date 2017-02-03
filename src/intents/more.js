const AssetsQuery = require('mxd-heimdall').AssetsQuery;

const Asset = require('../models/Asset');

module.exports = ({ heimdall }) => ['describe', async ({ response, session, startIntent }) => {
  if (!startIntent) {
    response.say('Der Intent unterstützt keine Pagination.');
    return;
  }
  session.set('pageStart', (session.get('pageStart') || 0) + 1);
  return startIntent;
}];
