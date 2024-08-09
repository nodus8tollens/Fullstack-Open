const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostLiked, blog) => {
    return blog.likes > mostLiked.likes ? blog : mostLiked;
  }, blogs[0]);
};

const _ = require("lodash");

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorBlogCounts = _.countBy(blogs, "author");

  const topAuthor = _.maxBy(
    Object.keys(authorBlogCounts),
    (author) => authorBlogCounts[author],
  );

  return {
    author: topAuthor,
    blogs: authorBlogCounts[topAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
