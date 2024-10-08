const blogRouter = require("express").Router();
const BlogPost = require("../models/blogPost");

blogRouter.get("/", async (request, response) => {
  try {
    //Populates blog posts with corresponding users
    const blogPosts = await BlogPost.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogPosts);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.get("/user/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const blogPosts = await BlogPost.find({ user: userId }).populate("user", {
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

blogRouter.post("/", async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: "Title is missing" });
  }
  if (!request.body.url) {
    return response.status(400).json({ error: "URL is missing" });
  }

  try {
    const user = request.user;
    console.log(user);
    //Saves blog post with its content and corresponding user's id
    const blogPost = new BlogPost({ ...request.body, user: user._id });
    const savedBlogPost = await blogPost.save();
    //Saves blog post's id to the corresponding (request's) user
    user.blogs = user.blogs.concat(savedBlogPost._id);
    await user.save();

    response.status(201).json(savedBlogPost);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  try {
    const user = request.user;
    console.log(user);
    const blogPost = await BlogPost.findById(request.params.id);

    if (!blogPost) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blogPost.user.toString() !== user.id.toString()) {
      return response
        .status(401)
        .json({ error: "Unauthorized: Not the creator" });
    }

    await BlogPost.findByIdAndDelete(request.params.id);
    response.status(204).end();
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
      comments: request.body.comments,
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
