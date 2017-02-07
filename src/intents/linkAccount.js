module.exports = ['linkAccount', async ({ response }) => {
  response
    .linkAccount()
    .say('Ok.');
}];
