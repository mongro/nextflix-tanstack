import { expect, test } from "@/e2e/fixture";

test("searchBar opens on click and closes on outside click", async ({
  page,
  dictionary,
  language,
}) => {
  await page.goto(`/${language}/shows`);
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.getByRole("textbox", { name: dictionary.buttons.searchPlaceholder }),
  ).toBeVisible();
  await page.mouse.click(0, 0);
  await expect(
    page.getByRole("textbox", { name: dictionary.buttons.searchPlaceholder }),
  ).not.toBeVisible();
});
test("searchbar changes url correctly", async ({
  page,
  dictionary,
  language,
}) => {
  await page.goto(`/${language}/shows`);
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.getByRole("textbox", { name: dictionary.buttons.searchPlaceholder }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: dictionary.buttons.searchPlaceholder })
    .fill("harry");
  await expect(
    page.getByRole("textbox", { name: dictionary.buttons.searchPlaceholder }),
  ).toHaveValue("harry");
  await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();
  await expect(page).toHaveURL(`/${language}/search?q=harry`);
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(
    page.getByRole("textbox", { name: dictionary.buttons.searchPlaceholder }),
  ).not.toBeVisible();
  await expect(page).toHaveURL(`/${language}/shows`);
  await expect(page.getByRole("button", { name: "Clear" })).not.toBeVisible();
});
