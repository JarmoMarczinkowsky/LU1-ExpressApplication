const logger = require("../util/logger");
const passport = require("passport");

module.exports = {
  authenticate: (req, res, next) => {
    if (req.session && req.session.user) {
      logger.debug("User is logged in");
      next();
    } else {
      logger.warn("User is not authenticated");
      res.redirect("/auth/login"); // or res.status(403).send('Forbidden');
    }
  }
};
