const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  res.send("Hey");
});

app.listen(PORT);
