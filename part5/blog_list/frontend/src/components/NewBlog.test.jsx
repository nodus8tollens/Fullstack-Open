import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";
import { vi, expect } from "vitest";

/*
Make a test for the new blog form. The test should check, that the form calls the event handler 
it received as props with the right details when a new blog is created.
*/

test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
  // Mock addBlog and setNotification functions via the vitest library
  const addBlog = vi.fn();
  const setNotification = vi.fn();

  // A rendered (via the react test library) NewBlog component (object)
  // desctructured and declared to the container variable
  const { container } = render(
    <NewBlog addBlog={addBlog} setNotification={setNotification} />
  );

  const titleInput = container.querySelector(".title-input");
  const authorInput = container.querySelector(".author-input");
  const urlInput = container.querySelector(".url-input");

  //Simulated inputs with the user-event library
  await userEvent.type(titleInput, "Test Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "http://test.url");

  const createBlogButton = container.querySelector(".create-blog-button");

  //Simulated click with the user-event library
  await userEvent.click(createBlogButton);

  //Expected outputs from the test
  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith({
    title: "Test Title",
    author: "Test Author",
    url: "http://test.url",
  });
});
