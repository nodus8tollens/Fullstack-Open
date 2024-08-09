const router = require("express").Router();
const BlogPost = require("../models/blogPost");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await BlogPost.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
