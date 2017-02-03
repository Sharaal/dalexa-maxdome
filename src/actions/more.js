module.exports = ['more', (lastIntent) => async ({ session }) => {
  const pageStart = session.get('pageStart');
  if (!pageStart) {
    response.say('Der Intent unterstützt kein Pagination.');
    return;
  }
  session
    .keep()
    .set('pageStart', pageStart + 1);
  return lastIntent;
}];
