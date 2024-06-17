const blogRouter = require("express").Router();
const BlogPost = require("../models/blogPost");

blogRouter.get("/", async (request, response) => {
  const blogPosts = await BlogPost.find({});
  response.json(blogPosts);
});

blogRouter.post("/", (request, response) => {
  const blogPost = new BlogPost(request.body);

  blogPost.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
