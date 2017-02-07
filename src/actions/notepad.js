module.exports = ({ heimdall }) => ['notepad', (lastIntent) => async ({ request, response, session }) => {
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
  await heimdall.post(`mxd/notepad/${linkedAccount.customer.customerId}`, {
    body: { contentId: assetId },
    headers: { 'mxd-session': linkedAccount.sessionId },
  });
  response.say('Inhalt wurde zum Merkzettel hinzugefügt.');
}];
