const SessionOptions = require('drequest-maxdome').SessionOptions;

module.exports = ({ maxdome }) => ['notepad', () => async ({ request, response, session }) => {
  session.shouldEndSession = false;
  const assetId = session.get('assetId');
  if (!assetId) {
    response.say('Es wurde in dieser Session noch kein Asset angefragt.');
    return;
  }
  const linkedAccount = await request.linkedAccount();
  if (!linkedAccount) {
    response
      .say('Das Alexa Konto muss zuerst mit einem maxdome Benutzer verknüpft werden')
      .linkAccount();
    return;
  }
  await maxdome.request()
    .addOptions()
    .post(`v1/mxd/notepad/%customerId%`, [
      {
        body: { contentId: assetId }
      },
      new SessionOptions(linkedAccount)
    ]);
  response.say('Inhalt wurde zum Merkzettel hinzugefügt.');
}];
