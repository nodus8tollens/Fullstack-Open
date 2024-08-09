const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
//Upon mounting app to the PORT, it connects to mongo database
mongoose
  .connect(config.MONGODB_URI)
  .then((response) =>
    console.log(
      "Connected to MongoDB. Collection name: ",
      response.connections[0].name,
    ),
  );
//CORS enables cross-origin resource sharing thus allowing Express to accept requests from "foreign" domains.
//In this example, the React app (frontend) uses a different domain (port) from Express (backend).
app.use(cors());
//Parses JSON payloads from incoming HTTP requests and populates request.body with the data
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/blogs/", middleware.userExtractor, blogRouter);
app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
