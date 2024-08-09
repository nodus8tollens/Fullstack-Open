const loginWith = async (page, username, password) => {
  await page.getByTestId("login-username").fill(username);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();
};

const createBlog = async (page, content) => {
  await page.getByTestId("new-blog-button").click();
  await page.getByTestId("title-input").fill(content.title);
  await page.getByTestId("author-input").fill(content.author);
  await page.getByTestId("url-input").fill(content.url);
  await page.getByTestId("create-blog-button").click();
};

export { loginWith, createBlog };
