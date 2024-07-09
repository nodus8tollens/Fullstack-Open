/*Make a test, which checks that the component displaying a blog renders the blog's title and author, 
but does not render its URL or number of likes by default.
Add CSS classes to the component to help the testing as necessary.
*/

import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders content only with title and author", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
    user: null,
  };

  const blogs = [blog];
  const setBlogs = vi.fn();

  const { container } = render(
    <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} />
  );
  const div = container.querySelector(".blog-container");

  expect(div).toHaveTextContent("title");
  expect(div).toHaveTextContent("author");
  expect(div).not.toHaveTextContent("url");
  expect(div).not.toHaveTextContent("0");
});
