const blogRouter = require("express").Router();
const BlogPost = require("../models/blogPost");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  try {
    const blogPosts = await BlogPost.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogPosts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const blogPost = await BlogPost.findById(id).populate("user", {
      username: 1,
      name: 1,
    });
    if (blogPost) {
      response.json(blogPost);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.post("/", async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: "Title is missing" });
  }
  if (!request.body.url) {
    return response.status(400).json({ error: "URL is missing" });
  }

  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    const blogPost = new BlogPost({ ...request.body, user: user._id });
    const savedBlogPost = await blogPost.save();

    user.blogs = user.blogs.concat(savedBlogPost._id);
    await user.save();

    response.status(201).json(savedBlogPost);
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
