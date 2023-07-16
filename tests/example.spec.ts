import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Zitter/i);
});

test("has sign in button", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByRole("button", { name: "Continue with GitHub" })
  ).toBeVisible();
});
