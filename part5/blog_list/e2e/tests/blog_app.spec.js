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

    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Test User",
        username: "testuser",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

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
        await expect(page.getByTestId("blog-likes")).toHaveText("Likes: 1");
      });

      test("a blog can be deleted", async ({ page }) => {
        page.on("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          await dialog.accept();
        });

        await page.getByTestId("view-details-button").click();
        await page.getByTestId("delete-blog-button").click();

        await expect(page.getByText("Test Title")).not.toBeVisible();
      });

      test("only the user who added the blog sees the delete button", async ({
        page,
      }) => {
        await page.getByTestId("logout-button").click();
        await loginWith(page, "testuser", "password");
        await page.getByTestId("view-details-button").click();
        await expect(page.getByTestId("delete-blog-button")).not.toBeVisible();
      });
    });
  });
});
