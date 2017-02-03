module.exports = ['more', (lastIntent) => async ({ session }) => {
  session.keep();
  const pageStart = session.get('pageStart');
  if (!pageStart) {
    response.say('Der Intent unterstützt kein Pagination.');
    return;
  }
  session.set('pageStart', pageStart + 1);
  return lastIntent;
}];
