const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.MONGODB_URI)
  .then((response) =>
    console.log(
      "Connected to MongoDB. Collection name: ",
      response.connections[0].name
    )
  );

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs/", middleware.userExtractor, blogRouter);
app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);
app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
