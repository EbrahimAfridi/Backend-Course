const express = require("express");
const useRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logRequestResponse } = require("./middlewares/index");

const app = express();
const PORT = 8080;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/backend-course").then(() => console.log("MongoDB connection successful"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logRequestResponse("log.txt"));

// Routes
app.use("/api/users", useRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));