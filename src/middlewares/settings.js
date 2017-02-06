module.exports = ({ redis }) => async ({ request, session }) => {
  request.settings = async (key, value) => {
    if (value === undefined) {
      if (value === null) {
        await this.redis.del(`SETTINGS:${session.user.userId}:${key}`);
      } else {
        await this.redis.set(`SETTINGS:${session.user.userId}:${key}`, value);
      }
    } else {
      return await this.redis.get(`SETTINGS:${session.user.userId}:${key}`);
    }
  };
};
