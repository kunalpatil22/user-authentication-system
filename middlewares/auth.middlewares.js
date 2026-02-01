const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) return res.status(401).redirect("login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).redirect("login");
  }
};

const redirectIfAuthenticated = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) return next();

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.redirect("/");
  } catch (err) {
    res.next();
  }
};

module.exports = { authenticate, redirectIfAuthenticated };
