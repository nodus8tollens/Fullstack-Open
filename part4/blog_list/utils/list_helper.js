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

module.exports = { dummy, totalLikes, favoriteBlog };
