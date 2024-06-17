const blogRouter = require("express").Router();
const BlogPost = require("../models/blogPost");

blogRouter.get("/", async (request, response) => {
  try {
    const blogPosts = await BlogPost.find({});
    response.json(blogPosts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const blogPost = await BlogPost.findById(id);
    response.json(blogPost);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.post("/", async (request, response) => {
  try {
    const blogPost = new BlogPost(request.body);
    const result = await blogPost.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = blogRouter;
