const express = require("express");
const router = express.Router();
const models = require("../../models");
const log = require("./register.js");

router.post('/UserId', (req, res) => {
  models.users.findOne({
    attributes: ["id"],
    where: { login: req.body.login }
  }).then(u => res.json(u))


})


router.post("/", log.register);
router.post("/forgot", log.forgot);
router.get("/", (req, res) => {
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
      id: [10]
    }
  });
  //////////////////////////////////////////////////
*/
  models.users.findAll().then(u => res.json(u));
});

module.exports = router;