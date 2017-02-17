module.exports = ({ redis }) => async ({ request, session }) => {
  request.settings = async (setting, value1) => {
    const key = `SETTINGS:${session.user.userId}:${setting}`;
    return new Promise((resolve, reject) => {
      if (value1 === undefined) {
        redis.get(key, (err, value2) => {
          if (err) {
            reject(err);
          } else {
            resolve(value2);
          }
        });
      } else if (value1 === null) {
        redis.del(key, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        redis.set(key, value1, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  };
};
