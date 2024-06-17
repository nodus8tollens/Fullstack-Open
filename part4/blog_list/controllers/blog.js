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
  if (!request.body.title) {
    return response.status(400).json({ error: "Title is missing" });
  }
  if (!request.body.url) {
    return response.status(400).json({ error: "URL is missing" });
  }

  try {
    const blogPost = new BlogPost(request.body);
    const result = await blogPost.save();
    response.status(201).json(result).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const result = await BlogPost.findByIdAndDelete(id);
    response.status(204).json(result).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedBlogPost = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
    };

    const result = await BlogPost.findByIdAndUpdate(id, updatedBlogPost, {
      new: true,
    });
    response.status(200).json(result).end();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = blogRouter;
