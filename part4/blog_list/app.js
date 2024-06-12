const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const config = require("./utils/config");

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
app.use("/api/blogs", blogRouter);

module.exports = app;