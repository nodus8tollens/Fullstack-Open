const BlogPost = require("../models/blogPost");
const User = require("../models/user");

const initialBlogPosts = [
  {
    _id: "5a422aa71b54a676234d17f1",
    title: "Clean Code",
    author: "Robert C. Martin",
    url: "https://cleancoder.com/files/CleanCodeSample.pdf",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f2",
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    url: "https://archive.org/details/TheArtOfComputerProgramming",
    likes: 15,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f3",
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson and Gerald Jay Sussman",
    url: "https://mitpress.mit.edu/sites/default/files/sicp/index.html",
    likes: 20,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f4",
    title: "Introduction to Algorithms",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
    url: "https://mitpress.mit.edu/sites/default/files/sicp/index.html",
    likes: 25,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f5",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides",
    url: "https://www.uml-diagrams.org/design-patterns.html",
    likes: 30,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blogPost = new BlogPost({ content: "willremovethissoon" });
  await blogPost.save();
  await blogPost.deleteOne();

  return blogPost._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const blogPostsInDB = async () => {
  const blogPosts = await BlogPost.find({});
  return blogPosts.map((blogPost) => blogPost.toJSON());
};

module.exports = {
  initialBlogPosts,
  nonExistingId,
  blogPostsInDB,
  usersInDb,
};
