const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  const listWithFiveBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "1",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 1,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "2 To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "3",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "4",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 4,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "5",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(listWithFiveBlogs);
    const expected = {
      _id: "5a422aa71b54a676234d17f8",
      title: "5",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    };
    assert.deepStrictEqual(result, expected);
  });
});
