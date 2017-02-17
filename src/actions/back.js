module.exports = ['back', lastIntent => async ({ response, session }) => {
  session.shouldEndSession = false;
  const pageStart = session.get('pageStart');
  if (!pageStart) {
    response.say('Der Intent unterstützt kein Pagination.');
    return;
  }
  if (pageStart === 1) {
    response.say('Du bist bereits am Anfang.');
    return;
  }
  session.set('pageStart', pageStart - 1);
  return lastIntent;
}];
