import path from "node:path";
import { expect, test as setup } from "@playwright/test";

const authFile = path.join(
  import.meta.dirname,
  "../playwright/.auth/user.json",
);
setup("authenticate", async ({ page }) => {
  // The test database is empty on a fresh CI run, so the test user has to be
  // created first. Against a persistent local DB where it already exists, the
  // form just won't navigate away — that's expected and safe to ignore.
  await page.goto("/en/auth/register");
  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD!);
  await page.getByLabel("Username").fill("E2E Test User");
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForURL("/en", { timeout: 5000 }).catch(() => {});

  await page.goto("/en/auth/login");
  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "Login" }).click();
  // Wait for the final redirect to confirm cookies are set
  await page.waitForURL("/en/account/profile-select");
  await page.getByRole("button", { name: "selectProfile" }).click();
  await page.waitForURL("/en");

  // Save the authenticated state
  await page.context().storageState({ path: authFile });
});
