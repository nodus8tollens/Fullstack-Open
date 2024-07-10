const loginWith = async (page, username, password) => {
  await page.getByTestId("login-username").fill(username);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();
};

const createNote = async (page, content, important) => {
  await page.getByTestId("new-note-button").click();
  await page.getByTestId("new-note-input").fill(content);
  await page.getByTestId("save-note-button").click();
};

export { loginWith, createNote };
