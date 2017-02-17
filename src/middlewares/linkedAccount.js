const SessionOptions = require('drequest-maxdome').SessionOptions;

module.exports = ({ maxdome, redis }) => async ({ request, session }) => {
  request.linkedAccount = async () => {
    const token = session.user.accessToken;
    if (!token) {
      return;
    }
    return new Promise((resolve, reject) => {
      redis.getJSON(`LINKEDACCOUNT:${token}`, (err1, linkedAccount) => {
        if (err1) {
          reject(err1);
        } else {
          (async () => {
            try {
              await maxdome.request()
                .post(`v1/auth/keepalive`, new SessionOptions(linkedAccount));
              resolve(linkedAccount);
            } catch (e1) {
              try {
                const data = await maxdome.request()
                  .post(`v1/autologin_portal`, {
                    body: { autoLoginPin: linkedAccount.autoLoginPin },
                  });
                const newLinkedAccount = {
                  autoLoginPin: data.autoLoginPin,
                  customer: { customerId: data.customer.customerId },
                  sessionId: data.sessionId,
                };
                redis.setJSON(`LINKEDACCOUNT:${token}`, newLinkedAccount, (err2) => {
                  if (err2) {
                    reject(err2);
                  } else {
                    resolve(newLinkedAccount);
                  }
                });
              } catch (e2) {
                redis.del(`LINKEDACCOUNT:${token}`, (err2) => {
                  if (err2) {
                    reject(err2);
                  } else {
                    resolve();
                  }
                });
              }
            }
          })();
        }
      });
    });
  };
};
