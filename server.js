const express = require("express");
const cors = require("cors");
const app = express();
const models = require("../models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const auth = require("./routes/auth.js");
const log = require("./routes/register.js");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

models.sequelize.sync().then(() => {
  app.listen(3001);
});

app.use("/auth", auth);
app.get("/messages", (req, res) => {
  /*
  ////////////// SCRIPT POST Message ///////////////
  const newMessage = new models.messages({
    id: 1,
    message: "@ Hello World @"
  });
  newMessage.save();
  //////////////////////////////////////////////////
*/
  /*
  ////////////////SCRIPT UPDATE Message/////////////
  models.messages.update({ userId: 1 }, { where: { id: 1 } });
  //////////////////////////////////////////////////
*/

  /*
/////////////// SCRIPT SELECT Message ////////////
  models.messages.find({ where: { id: 0 } }).then(u => {
    res.json(u);
  });
//////////////////////////////////////////////////
*/
  /*
  /////////////// SCRIPT DELETE Message ////////////
  models.messages.destroy({
    where: {
      id: [107, 108]
    }
  });
  //////////////////////////////////////////////////
*/
  models.messages.findAll().then(u => res.json(u));
});
app.get("/users", (req, res) => {
  /*
  ////////////// SCRIPT POST User //////////////////
  const newUser = new models.users({
    id: 1,
    login: "test",
    pass: "test"
  });
  newUser.save();
  //////////////////////////////////////////////////
*/
  /*
////////////////SCRIPT UPDATE User////////////////
models.users.update(
    { id: 8 },
    { where: { id: 2 } }
  );
//////////////////////////////////////////////////
*/
  /* 
/////////////// SCRIPT SELECT User ///////////////
  models.users.find({ where: { login: "admin" } }).then(u => {
    res.json(u);
});
//////////////////////////////////////////////////
*/
  /*
  /////////////// SCRIPT DELETE User ///////////////
  models.users.destroy({
    where: {
      id: [89]
    }
  });
  //////////////////////////////////////////////////
*/
  models.users.findAll().then(u => res.json(u));
});
app.post('/UserId', (req, res) => {
  models.users.findOne({
    attributes: ["id"],
    where: { login: req.body.login }
  }).then(u => res.json(u))


})

app.post("/users", log.register);

app.post("/messages", (req, res) => {
  console.log("New Message :");
  res.sendStatus(200);
  console.log(req.body);
  const formData = req.body;
  const newMessage = new models.messages(formData);

  newMessage.save();
});
