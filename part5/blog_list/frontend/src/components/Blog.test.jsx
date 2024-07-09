import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { vi, expect } from "vitest";

/*
Make a test, which checks that the component displaying a blog renders the blog's title and author, 
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

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog-container");

  expect(div).toHaveTextContent("title");
  expect(div).toHaveTextContent("author");
  expect(div).not.toHaveTextContent("url");
  expect(div).not.toHaveTextContent("0");
});

/*
Make a test, which checks that the blog's URL and number of likes are shown 
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

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog-container");

  const user = userEvent.setup();
  const viewDetailsButton = container.querySelector(".view-details-button");

  await user.click(viewDetailsButton);

  expect(div).toHaveTextContent("url");
  expect(div).toHaveTextContent("0");
});

/*
Make a test, which ensures that if the like button is clicked twice, 
the event handler the component received as props is called twice.
*/

test("if like button is clicked twice the event handler is called twice", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
    user: null,
  };

  const mockLikeHandler = vi.fn();

  const { container } = render(
    <Blog blog={blog} increaseLike={mockLikeHandler} />
  );

  const user = userEvent.setup();

  const viewDetailsButton = container.querySelector(".view-details-button");
  await user.click(viewDetailsButton);

  const likeBlogButton = container.querySelector(".like-blog-button");
  await user.click(likeBlogButton);
  await user.click(likeBlogButton);

  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
