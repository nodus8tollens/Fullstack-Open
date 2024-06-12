const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
