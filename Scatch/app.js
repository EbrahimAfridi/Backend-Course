const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const expressSession = require("express-session");
const flash = require("connect-flash");
const db = require("./config/mongoose-connection");
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

// DOTENV Config
require("dotenv").config();
const port = 3000;

// Middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.set("view engine", "ejs");

// Routes + Controllers
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter); // means =>  /users/[ ANY FOLLOWING ROUTES ]
app.use("/products", productsRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
