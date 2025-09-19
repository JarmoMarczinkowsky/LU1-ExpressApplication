const logger = require("../util/logger");
const authService = require("../services/auth.services");

const TAG = "auth.controller";

function showLoginPage(req, res) {
  logger.info(TAG, "showLoginPage", "Rendering login page");
  view = "auth/login";
  model = { title: "Login" };
  res.render(view, model);
}

function showRegisterPage(req, res) {
  logger.info(TAG, "showRegisterPage", "Rendering register page");
  view = "auth/register";
  model = { title: "Register" };
  res.render(view, model);
}

function handleLogin(req, res) {
  logger.debug("im handling login");
  const { email, password } = req.body;
  authService.login(email, password, (err, user) => {
    if (err) {
      logger.error(TAG, "handleLogin", "Error during login: " + err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
}

// handelt POST af
function postLogin(req, res, next) {
  logger.debug(`${TAG} postLogin`);
  authService.login(req.body, (err, user) => {
    if (err) {
      // Verwerk de error, bv loginscherm
      // tonen met foutmelding.
      logger.error(`${TAG} postLogin error: ${err}`);

      const model = { error: "Invalid email or password" };
      const view = "auth/login";
      return res.render(view, model);
    } else {
      // user logged in: zet user in session
      logger.info(`${TAG} postLogin success: ${user.email} logged in`);

      req.session.user = user;
      return res.redirect('/');
    }
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      logger.error(TAG, "logout", "Could not log out. Please try again.");
      return res.status(500).json({ message: "Could not log out. Please try again." });
    }
    logger.info(TAG, "logout", "User logged out successfully");
    res.redirect("/auth/login");
  });
}

module.exports = {
  showLoginPage,
  showRegisterPage,
  handleLogin,
  postLogin,
  logout
};
// login: (req, res, next) => {
//     logger.info(TAG, 'login', 'Rendering login page');
//     // res.render('login', { title: 'Login' });

//     // authService.
// },
// register: (req, res, next) => {
//     logger.info(TAG, 'register', 'Rendering register page');
//     // res.render('register', { title: 'Register' });
// },

// handleLogin: (req, res, next) => {
//     logger.debug(TAG, 'handleLogin', 'Handling login');
//     authService.login(req.body, (err, user) => {
//         if (err) {
//             logger.error(TAG, 'handleLogin', 'Error during login: ' + err);
//             return res.status(500).json({ message: 'Internal server error' });
//         }
//         //user.email
//         //user.password
//         //user.name
//         req.session.user = user;

//         return res.redirect('/');
//     });
// }
