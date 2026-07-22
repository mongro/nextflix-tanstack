// helpers/fixtures.ts
import path from "node:path";
import { test as base } from "@playwright/test";
import type { Page } from "@playwright/test";
import type { Dictionary } from "~/i18n/type";
import dictionaryData from "~/i18n/en.json" with { type: "json" };
import prisma from "~/lib/prisma";

// 1. Define the type for your fixture data
type TestFixtures = {
  dictionary: Dictionary; // Replace with the actual type of your dictionary
  language: string; // Add other fixtures as needed
};

// Each parallel worker registers and logs in as its own dedicated test
// account (unique email -> its own auto-created profile -> its own login
// session). Without this, every worker shared one account/session, so
// concurrent workers raced on the same profile's DB rows and stomped each
// other's `selectedProfileId` on the one shared session.
type WorkerFixtures = {
  workerStorageState: string; // Path to this worker's saved storage state
  profileId: number; // The profile id belonging to this worker's test user
};

const AUTH_DIR = path.join(import.meta.dirname, "../playwright/.auth");

function workerEmail(parallelIndex: number) {
  const baseEmail = process.env.TEST_USER_EMAIL!;
  const at = baseEmail.indexOf("@");
  // plus-addressing keeps this a syntactically valid, unique email per
  // worker without needing real inboxes - only DB-level uniqueness matters.
  return `${baseEmail.slice(0, at)}+e2e-w${parallelIndex}${baseEmail.slice(at)}`;
}

async function registerAndLogin(page: Page, email: string, username: string) {
  const password = process.env.TEST_USER_PASSWORD!;

  // The test database is empty on a fresh CI run, so the worker's test user
  // has to be created first. Against a persistent local DB where it already
  // exists, the form just won't navigate away - that's expected and safe to
  // ignore.
  await page.goto("/en/auth/register");
  // Auth pages render no Header, so there's no visible element that flips
  // once hydration completes (unlike account-button elsewhere) - wait for
  // the lazy route JS to finish loading so the click below isn't swallowed
  // pre-hydration.
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByLabel("Username").fill(username);
  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForURL("/en", { timeout: 5000 }).catch(() => {});

  await page.goto("/en/auth/login");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  // Wait for the final redirect to confirm cookies are set
  await page.waitForURL("/en/account/profile-select");
  await page.getByRole("button", { name: "account-button" }).waitFor();
  await page.getByRole("button", { name: "selectProfile" }).click();
  await page.waitForURL("/en");
}

// 2. Extend the base test object with your dictionary
export const test = base.extend<TestFixtures, WorkerFixtures>({
  dictionary: async ({ page }, use) => {
    // Pass the JSON data into the test context
    await use(dictionaryData);
  },
  language: async ({ page }, use) => {
    // You can set a default language or derive it from the page context
    await use("en"); // Replace with logic to determine the language if needed
  },

  // Playwright's built-in `storageState` fixture is fixed at test scope, so
  // it just reads the file this worker already produced.
  storageState: async ({ workerStorageState }, use) => {
    await use(workerStorageState);
  },

  workerStorageState: [
    async ({ browser }, use, workerInfo) => {
      const authFile = path.join(
        AUTH_DIR,
        `worker-${workerInfo.parallelIndex}.json`,
      );
      const email = workerEmail(workerInfo.parallelIndex);

      // Important: authenticate in a clean context, unrelated to any
      // storageState this fixture itself is about to produce. A page
      // created directly from `browser` doesn't inherit the project's
      // baseURL, so it has to be passed through explicitly.
      const page = await browser.newPage({
        storageState: undefined,
        baseURL: workerInfo.project.use.baseURL,
      });
      await registerAndLogin(
        page,
        email,
        `E2E Worker ${workerInfo.parallelIndex}`,
      );
      await page.context().storageState({ path: authFile });
      await page.close();

      await use(authFile);
    },
    { scope: "worker" },
  ],

  profileId: [
    // Depends on `workerStorageState` purely to sequence after this
    // worker's account has been registered - Playwright statically parses
    // this signature to determine fixture dependencies, so the key must be
    // present even though the value itself is unused here.
    async ({ workerStorageState: _workerStorageState }, use, workerInfo) => {
      const email = workerEmail(workerInfo.parallelIndex);
      const user = await prisma.user.findUniqueOrThrow({
        where: { email },
        include: { profiles: true },
      });
      const profile = user.profiles.at(0);
      if (!profile) {
        throw new Error(`No profile found for test user ${user.email}`);
      }
      await use(profile.id);
    },
    { scope: "worker" },
  ],
});

// Export expect so you can import everything from this one file
export { expect } from "@playwright/test";
