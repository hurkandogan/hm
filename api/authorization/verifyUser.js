const db = require("../model/connection");
const User = db.users;
const jwt = require("jsonwebtoken");
const process = require("process");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isUser = (req, res, next) => {
  User.findByPk(req.userId)
    .then(response => {
      if (response) {
        return res.status(200).send(true);
      }
    })
    .catch(err => res.status(500).send({
      error: error,
      message: "A server error occured."
  }))
  return res.status(401).send({
    message: "Unauthorized"
  })
};

const auth = {
  verifyToken: verifyToken,
  isUser: isUser
}

module.exports = auth;