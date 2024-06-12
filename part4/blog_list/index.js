const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
