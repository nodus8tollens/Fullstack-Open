const { test, describe, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("favorite blog", () => {
  test("returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(helper.initialBlogPosts);
    const expected = {
      _id: "5a422aa71b54a676234d17f5",
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides",
      url: "https://www.uml-diagrams.org/design-patterns.html",
      likes: 30,
      __v: 0,
    };
    assert.deepStrictEqual(result, expected);
  });
});

after(async () => {
  await mongoose.connection.close();
});
