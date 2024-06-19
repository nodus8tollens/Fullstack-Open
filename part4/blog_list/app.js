const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

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
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users/", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
