const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const BlogPost = require("../models/blogPost");
const User = require("../models/user");
const helper = require("./test_helper");

let token;
let userId;
  
beforeEach(async () => {
  await BlogPost.deleteMany({});
  await User.deleteMany({});

  const testUser = {
    username: "tester",
    name: "tester testman",
    password: "password",
  };

  await api.post("/api/users").send(testUser);

  const loginResponse = await api
    .post("/api/login")
    .send(testUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  token = loginResponse.body.token;
  userId = loginResponse.body.id;

  const blogPostsWithUser = helper.initialBlogPosts.map((post) => ({
    ...post,
    user: userId,
  }));

  await BlogPost.insertMany(blogPostsWithUser);
});

describe("blog api requests", () => {
  test("get all blog posts", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(
      response.body.length,
      helper.initialBlogPosts.length,
      "DB length should equal initialDB length"
    );
  });

  test("blog posts have id property instead of _id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

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
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(
      response.body.length,
      helper.initialBlogPosts.length + 1,
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
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const createdBlogId = postResponse.body.id;

    const response = await api
      .get(`/api/blogs/${createdBlogId}`)
      .set("Authorization", `Bearer ${token}`);

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
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("URL missing returns 400", async () => {
    const newBlogPost = {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      likes: 45,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlogPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("delete one post", async () => {
    const blogToDelete = await BlogPost.findOne({ user: userId });

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const result = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(
      result.body.length,
      helper.initialBlogPosts.length - 1,
      "DB length should decrease by one after deletion"
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
      .set("Authorization", `Bearer ${token}`)
      .send(updateBlogPost)
      .expect(200);

    const response = await api
      .get(`/api/blogs/${updateBlogPost._id}`)
      .set("Authorization", `Bearer ${token}`);

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
      .set("Authorization", `Bearer ${token}`)
      .send(updateBlogPost)
      .expect(200);

    const response = await api
      .get(`/api/blogs/${updateBlogPost._id}`)
      .set("Authorization", `Bearer ${token}`);

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
});

describe("user creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
