const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGO_URI")}/scatch`)
  .then(function () {
    dbgr("Connected to MongoDB");
  })
  .catch(function (err) {
    console.error(err);
  });

module.exports = mongoose.connection;
