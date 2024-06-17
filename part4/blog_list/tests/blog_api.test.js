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
  const newBlogPost = {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    url: "https://www.cleancoder.com/",
    likes: 45,
  };

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

test("verify that missing likes field defaults to 0", async () => {
  const newBlogPost = {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    url: "https://www.cleancoder.com/",
  };

  const postResponse = await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const createdBlogId = postResponse.body.id;

  console.log("created blog id: ", createdBlogId, typeof createdBlogId);

  const response = await api.get(`/api/blogs/${createdBlogId}`);

  console.log("Response Body", response.body);

  assert(response.body, "Response body should not be empty");

  assert.strictEqual(
    response.body.likes,
    0,
    "missing likes field does not default to zero"
  );
});

test("title missing returns 400", async () => {
  const newBlogPost = {
    author: "Robert C. Martin",
    url: "https://www.cleancoder.com/",
    likes: 45,
  };

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});

test("URL missing returns 400", async () => {
  const newBlogPost = {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    likes: 45,
  };

  await api
    .post("/api/blogs")
    .send(newBlogPost)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("delete one post", async () => {
  console.log("initialBLogPosts pre-deletion: ", initialBlogPosts);

  await api.delete(`/api/blogs/${initialBlogPosts[0]._id}`);

  const result = await api.get("/api/blogs");

  console.log("get all posts result: ", result.body);

  assert.strictEqual(
    initialBlogPosts.length,
    result.body.length + 1,
    "initial db and result from delete operation are not the same length"
  );
});

test("update one post", async () => {
  const updateBlogPost = {
    _id: "5a422aa71b54a676234d17f1",
    title: "Updated Title",
    author: "Test Man",
    url: "https://cleancoder.com/files/CleanCodeSample.pdf",
    likes: 10,
    __v: 0,
  };

  await api
    .put(`/api/blogs/${updateBlogPost._id}`)
    .send(updateBlogPost)
    .expect(200);

  const response = await api.get(`/api/blogs/${updateBlogPost._id}`);

  assert.strictEqual(
    response.body.title,
    updateBlogPost.title,
    "Title was not updated correctly"
  );
  assert.strictEqual(
    response.body.author,
    updateBlogPost.author,
    "Author was not updated correctly"
  );
  assert.strictEqual(
    response.body.url,
    updateBlogPost.url,
    "URL was not updated correctly"
  );
  assert.strictEqual(
    response.body.likes,
    updateBlogPost.likes,
    "Likes were not updated correctly"
  );
});

test("update one post; compare whole objects", async () => {
  const updateBlogPost = {
    _id: "5a422aa71b54a676234d17f1",
    title: "Updated Title",
    author: "Test Man",
    url: "https://cleancoder.com/files/CleanCodeSample.pdf",
    likes: 10,
  };

  await api
    .put(`/api/blogs/${updateBlogPost._id}`)
    .send(updateBlogPost)
    .expect(200);

  const response = await api.get(`/api/blogs/${updateBlogPost._id}`);

  const updatedBlogPost = {
    id: response.body.id,
    title: response.body.title,
    author: response.body.author,
    url: response.body.url,
    likes: response.body.likes,
  };

  assert.deepEqual(
    updatedBlogPost,
    {
      id: updateBlogPost._id,
      title: updateBlogPost.title,
      author: updateBlogPost.author,
      url: updateBlogPost.url,
      likes: updateBlogPost.likes,
    },
    "something was not updated correctly"
  );
});
after(async () => {
  await mongoose.connection.close();
});
