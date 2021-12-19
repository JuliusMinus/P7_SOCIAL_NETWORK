const jwt = require("jsonwebtoken");
const CONFIG = require("../config.js");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
