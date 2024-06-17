const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const BlogPost = require("../models/blogPost");

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

beforeEach(async () => {
  await BlogPost.deleteMany({});

  await BlogPost.insertMany(initialBlogPosts);
});

test("get all blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(
    response.body.length,
    initialBlogPosts.length,
    "DB length should equal initialDB length"
  );
});

test("blog posts have id property instead of _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert(blog.id, "Blog should have an id property");
    assert.strictEqual(
      blog._id,
      undefined,
      "Blog should not have an _id property"
    );
  });
});

test("make a blog post", async () => {
  const newBlogPost = new BlogPost({
    _id: "6b533bb82c65b787345e28g6",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    url: "https://www.cleancoder.com/",
    likes: 45,
    __v: 0,
  });

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  assert.strictEqual(
    response.body.length,
    initialBlogPosts.length + 1,
    "Length of initial db hasn't increased by one i.e. entry is not PUT"
  );
});

after(async () => {
  await mongoose.connection.close();
});
