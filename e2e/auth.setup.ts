import path from "node:path";
import { expect, test as setup } from "@playwright/test";

const authFile = path.join(
  import.meta.dirname,
  "../playwright/.auth/user.json",
);
setup("authenticate", async ({ page }) => {
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
