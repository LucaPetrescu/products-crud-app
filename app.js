const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const routes = require("./routes/routes");
const db = require("./helpers/key").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(5000, () => {
    console.log("Listening to " + 5000);
});