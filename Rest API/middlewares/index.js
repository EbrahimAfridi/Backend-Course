const fs = require("fs");

function logRequestResponse(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      "log.txt",
      `\nCreated at: ${Date.now()} || Method: ${req.method} || Path: ${
        req.path
      }\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {
  logRequestResponse
};