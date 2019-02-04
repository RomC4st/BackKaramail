const express = require("express");
const cors = require("cors");
const app = express();
const models = require("../models");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const auth = require("./routes/auth.js");
const routerMessages = require('./routes/messages')
const routerUsers = require('./routes/users')

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/auth", auth);
app.use('/messages', routerMessages);
app.use('/users', routerUsers);

models.sequelize.sync().then(() => {
  app.listen(3001);
});