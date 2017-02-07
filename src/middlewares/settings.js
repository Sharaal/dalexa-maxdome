module.exports = ({ redis }) => async ({ request, session }) => {
  request.settings = async (setting, value) => {
    const key = `SETTINGS:${session.user.userId}:${setting}`;
    return new Promise((resolve, reject) => {
      if (value === undefined) {
        redis.get(key, (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      } else {
        if (value === null) {
          redis.del(key, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          redis.set(key, value, (err) => {
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
