module.exports = ({ redis }) => async ({ request, session }) => {
  request.settings = async (key, value) => {
    return new Promise((resolve, reject) => {
      if (value === undefined) {
        redis.get(`SETTINGS:${session.user.userId}:${key}`, (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      } else {
        if (value === null) {
          redis.del(`SETTINGS:${session.user.userId}:${key}`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          redis.set(`SETTINGS:${session.user.userId}:${key}`, value, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      }
    });
  };
};
