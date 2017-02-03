module.exports = ['more', async ({ response, session, startIntent }) => {
  if (!startIntent) {
    response.say('Der Intent unterstützt keine Pagination.');
    return;
  }
  session.set('pageStart', (session.get('pageStart') || 1) + 1);
  return startIntent;
}];
