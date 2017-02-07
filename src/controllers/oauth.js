const shortid = require('shortid');

const route = '/oauth';

module.exports = ({ heimdall, redis }) => [
  ['get', [route, async (req, res) => {
    res.sendFile('oauth.html', { root: __dirname + '/../../views/' });
  }]],
  ['post', [
    route,
    require('body-parser').urlencoded({ extended: false }),
    async (req, res) => {
      try {
        const data = await heimdall.post('auth/login', {
          body: {
            userId: req.body.email,
            phrase: req.body.password,
            autoLogin: true
          },
        });
        const token = shortid.generate();
        const linkedAccount = {
          autoLoginPin: data.autoLoginPin,
          customer: { customerId: data.customer.customerId },
          sessionId: data.sessionId,
        };
        await new Promise((resolve, reject) => {
          redis.setJSON(`LINKEDACCOUNT:${token}`, linkedAccount, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        res.status(200).send({ token });
      } catch (e) {
        res.status(403).send();
      }
    }
  ]],
];
