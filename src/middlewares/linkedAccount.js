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
          console.log('A');
          console.log(linkedAccount);
          (async () => {
            try {
              console.log('B');
              await heimdall.post('/auth/keepalive', {
                headers: { 'mxd-session': linkedAccount.sessionId },
              });
              console.log('C');
              resolve(linkedAccount);
            } catch (e1) {
              try {
                console.log('D');
                const data = await heimdall.post('autologin_portal', {
                  body: { autoLoginPin: linkedAccount.autoLoginPin },
                });
                console.log('E');
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
        }
      });
    });
  };
};
