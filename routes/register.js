const bcrypt = require("bcrypt");
const models = require("../../models");

module.exports = {
  register: (req, res) => {
    const pass = req.body.pass;
    const login = req.body.login;

    bcrypt.hash(pass, 5, (err, bcryptedPassword) => {
      console.log(pass);
      models.users
        .findOrCreate({
          where: {
            login: login,
            pass: bcryptedPassword
          }
        })
        .then(res.status(200));
    });
  }
};
