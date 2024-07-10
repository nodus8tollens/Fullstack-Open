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

  /*
  Create a test that verifies that a logged in user can create a blog. 
  */
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, {
        title: "Test Title",
        author: "Test Author",
        url: "Test URL",
      });
      await expect(page.getByText("Test Title")).toBeVisible();
    });

    describe("a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "Test Title",
          author: "Test Author",
          url: "Test URL",
        });
      });
      test("a blog can be liked", async ({ page }) => {
        await page.getByTestId("view-details-button").click();
        await page.getByTestId("like-blog-button").click();
        await expect(page.getByTestId("blog-likes")).toHaveText("Likes:1");
      });
    });
  });
});
