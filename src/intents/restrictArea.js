module.exports = ['restrictArea', async ({ request, response }) => {
  const area = { Paket: 'package', Store: 'store' }[request.get('area')];
  if (!area) {
    response.say(`Der Bereich ${request.get('area')} ist nicht verfügbar.`);
  }
  request.settings('areaRestriction', area);
  response.say('Ok.');
}];
