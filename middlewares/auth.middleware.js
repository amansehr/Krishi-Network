const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../services/db.service").User;
module.exports.auth = (req, res, next) => {
  let bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send({ msg: "Authorization Required" });
  }

  const bearer = bearerHeader.split(" ");
  if (bearer.length !== 2 || bearer[0] != "Bearer") {
    return res.status(403).send({ msg: "Authorization Required" });
  }

  const token = bearer[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).send({ msg: "Invalid Token" });
      }
      let data = await User.findOne({
        where: {
          id: user.id,
        },
      });
      req.user = data.dataValues;
      next();
    });
  } else {
    return res.status(403).send({ msg: "Authorization Required" });
  }
};