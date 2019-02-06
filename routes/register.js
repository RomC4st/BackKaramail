require('dotenv').config();
const bcrypt = require("bcrypt");
const models = require("../../models");
const nodemailer = require("nodemailer");


module.exports = {

  register: (req, res) => {
    const pass = req.body.pass;
    const login = req.body.login;

    bcrypt.hash(pass, 5, (err, bcryptedPassword) => {
      console.log(pass);
      models.users
        .findOne({
          where: {
            login: login,
          }
        }).then(userFound => {
          if (userFound) {
            return res.sendStatus(409)
          }
          else {
            models.users.findOrCreate({
              where: {
                login: login,
                pass: bcryptedPassword
              }
            })
            return res.sendStatus(200)

          }
        })

    });
  },

  forgot: (req, res) => {

    const login = req.body.login;
    const email = req.body.email;

    models.users
      .findOne({
        where: { login: login }
      })
      .then(userFound  => {
        if (userFound) {

          const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "karamaildmn@gmail.com",
              pass: process.env.PASS_EMAIL
            }
          });

          const mailOptions = {
            to: email,
            from: "karamaildmn@gmail.com",
            subject: "Password Reset Karamail",
            text:
              "You are receiving this because you (or something else) have requested the reset of the password for your account.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
              "http://localhost:3000/reset_password/" + login +
              "\n\n" + 
              "If you did not request this, please ignore this email and your password will remain unchanged.\n"
          };
          smtpTransport.sendMail(mailOptions, function (err) {
            if(err)
            {
               return console.log(err);
            }
            })
              return res.status(200).json({ message: "email send" });
            
        }else{     
            return res
              .status(404)
              .json({ error: "No account with that login exists." });
        }}) 
  },
};
