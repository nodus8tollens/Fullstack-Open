const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  /*
  Create a new npm project for tests and configure Playwright there.
  Make a test to ensure that the application displays the login form by default.
  */
  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  /*
  Do the tests for login. Test both successful and failed login. 
  For tests, create a user in the beforeEach block.
  */
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Login Successful")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");
      await expect(page.getByText("Error Logging in")).toBeVisible();
    });
  });
});
