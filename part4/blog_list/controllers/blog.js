const blogRouter = require("express").Router();
const BlogPost = require("../models/blogPost");

blogRouter.get("/", (request, response) => {
  BlogPost.find({}).then((blogPosts) => {
    response.json(blogPosts);
  });
});

blogRouter.post("/", (request, response) => {
  const blogPost = new BlogPost(request.body);

  blogPost.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
