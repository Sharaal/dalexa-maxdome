module.exports = ['more', (lastIntent) => async ({ session }) => {
  session
    .keep()
    .set('pageStart', (session.get('pageStart') || 1) + 1);
  return lastIntent;
}];
