const express = require("express");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const models = require("../../models");
const jwtS = require("./jwtSecret.js");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

Router.post("/", (req, res) => {
  const pass = req.body.pass;
  const login = req.body.login;

  console.log(req.body);
  models.users
    .findOne({
      attributes: ["login", "pass"],
      where: { login: login }
    })
    .then(UserFound => {
      if (UserFound) {
        bcrypt.compare(pass, UserFound.pass, (errBcrypt, resBcrypt) => {
          if (resBcrypt) {
            console.log("passwordUser :", UserFound.pass);
            console.log(req.body.login);

            const tokenInfo = {
              name: req.body.login,
              role: "User"
            };

            const token = jwt.sign(tokenInfo, jwtS);

            res.set("x-access-token", token), console.log(token);
            res.header("Access-Control-Expose-Headers", "x-access-token");

            res.status(200).send({ info: "user connected" });

            /*return res.status(200);*/
          } else {
            console.log("error");
            return res.status(403);
          }
        });
      } else {
        return res.status(404).json({ error: "user don't exist in Database" });
      }
    });
});

const getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    console.log(req.headers.authorization.split(" ")[1]);
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

Router.post("/protected", (req, res) => {
  const token = getToken(req);
  console.log(token);

  jwt.verify(token, jwtS, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ mess: "User don't have access" });
    }
    return res.status(200).send({ mess: "User's data" });
  });
});
module.exports = Router;
