import { expect, test } from "@playwright/test";

test("expanding small modal to big modal", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
  await expect(page.getByTestId("thumbnail").first()).toBeVisible();
  await page.getByTestId("thumbnail").first().hover();
  await expect(page.getByTestId("movie-modal")).toBeVisible();

  await page.locator('[aria-label="moreInfo"]').click();
  await expect(page.locator('[data-testid="movie-modal-title"]')).toBeVisible();
  await expect(page).toHaveURL(/[?&]id=(movie|tv)-\d+/);
});

test("closing modal after pressing back button", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
  await expect(page.getByTestId("thumbnail").first()).toBeVisible();

  await page.getByTestId("thumbnail").first().hover();
  await expect(page.locator('[data-testid="movie-modal"]')).toBeVisible;

  await page.locator('[aria-label="moreInfo"]').click();
  await expect(page.locator('[data-testid="movie-modal-title"]')).toBeVisible();

  await page.goBack();

  await expect(page.getByTestId("movie-modal")).toBeHidden();
  await expect(page).not.toHaveURL(/[?&]id=(movie|tv)-\d+/);
});
