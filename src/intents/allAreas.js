module.exports = ['allAreas', async ({ request, response }) => {
  request.settings('areaRestriction', null);
  response.say('Ok.');
}];
