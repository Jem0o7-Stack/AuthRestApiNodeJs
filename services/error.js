const Errorlog = require("../model/errorlog");

module.exports = {
  async createErrorlog(error) {
    let result = await Errorlog.create(error);
    return result;
  },
};
