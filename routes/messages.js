const express = require("express");
const router = express.Router();
const models = require("../../models");

router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  models.messages.findAll({
    where: {
      userId: id
    }
  })
    .then(u => {
      if (u.length > 0) {
        res.status(200).json(u)
      } else {
        res.status(404).json(u)
      }
    })

})

router.post("/", (req, res) => {
  console.log("New Message :");
  res.sendStatus(200);
  console.log(req.body);
  const formData = req.body;
  const newMessage = new models.messages(formData);

  newMessage.save();
});

router.delete('/:id(\\d+)', (req, res) => {
  models.messages
    .findById(req.params.id)
    .then(MessageFound => {
      if (MessageFound) {
        models.messages.destroy({
          where: {
            id: req.params.id
          }
        }).then(result => {
            res.status(200)
        })
      }
      else {
        return res.status(404)
      }
    })

})

router.get("/", (req, res) => {
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

module.exports = router;