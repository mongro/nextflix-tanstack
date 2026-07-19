// helpers/fixtures.ts
import { test as base } from "@playwright/test";
import type { Dictionary } from "~/i18n/type";
import dictionaryData from "~/i18n/en.json" with { type: "json" };

// 1. Define the type for your fixture data
type TestFixtures = {
  dictionary: Dictionary; // Replace with the actual type of your dictionary
  language: string; // Add other fixtures as needed
};

// 2. Extend the base test object with your dictionary
export const test = base.extend<TestFixtures>({
  dictionary: async ({ page }, use) => {
    // Pass the JSON data into the test context
    await use(dictionaryData);
  },
  language: async ({ page }, use) => {
    // You can set a default language or derive it from the page context
    await use("en"); // Replace with logic to determine the language if needed
  },
});

// Export expect so you can import everything from this one file
export { expect } from "@playwright/test";
