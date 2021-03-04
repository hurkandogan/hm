const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const process = require("process");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!" // Forbidden
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      if (role.name === "user") {
        next();
        return;
      }
      res.status(403).send({
        message: "Require User Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAuthor: isAuthor,
  isUser: isUser,
};

module.exports = authJwt;