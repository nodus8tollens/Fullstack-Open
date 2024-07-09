import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

/*Make a test, which checks that the component displaying a blog renders the blog's title and author, 
but does not render its URL or number of likes by default.
Add CSS classes to the component to help the testing as necessary.
*/

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

/*Make a test, which checks that the blog's URL and number of likes are shown 
when the button controlling the shown details has been clicked.
*/

test("show url and likes after button click", async () => {
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

  const user = userEvent.setup();
  const button = container.querySelector(".view-details-button");

  await user.click(button);

  expect(div).toHaveTextContent("url");
  expect(div).toHaveTextContent("0");
});
