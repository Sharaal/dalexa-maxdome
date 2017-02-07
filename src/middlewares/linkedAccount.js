module.exports = ({ heimdall, redis }) => async ({ request, session }) => {
  request.linkedAccount = async () => {
    const token = session.user.accessToken;
    if (!token) {
      return;
    }
    return new Promise((resolve, reject) => {
      redis.getJSON(`LINKEDACCOUNT:${token}`, (err, linkedAccount) => {
        if (err) {
          reject(err);
        } else {
          (async () => {
            try {
              await heimdall.post('/auth/keepalive', {
                headers: { 'mxd-session': linkedAccount.sessionId },
              });
              return resolve(linkedAccount);
            } catch (e1) {
              try {
                const data = await heimdall.post('autologin_portal', {
                  body: { autoLoginPin: linkedAccount.autoLoginPin },
                });
                const newLinkedAccount = {
                  autoLoginPin: data.autoLoginPin,
                  customer: { customerId: data.customer.customerId },
                  sessionId: data.sessionId,
                };
                redis.setJSON(`LINKEDACCOUNT:${token}`, newLinkedAccount, (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(newLinkedAccount);
                  }
                });
              } catch (e2) {
                redis.del(`LINKEDACCOUNT:${token}`, (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              }
            }
          })();
          resolve(linkedAccount);
        }
      });
    });
  };
};
