module.exports = ['more', (lastIntent) => async ({ response, session }) => {
  session.shouldEndSession = false;
  const pageStart = session.get('pageStart');
  if (!pageStart) {
    response.say('Der Intent unterstützt kein Pagination.');
    return;
  }
  session.set('pageStart', pageStart + 1);
  return lastIntent;
}];
