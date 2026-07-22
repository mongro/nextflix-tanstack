import { expect, test } from "@/e2e/fixture";
import prisma from "~/lib/prisma";

test.beforeEach(async ({ page, language, profileId }) => {
  //  reset my List

  const result = await prisma.profileMovie.deleteMany({
    where: {
      profileId,
    },
  });

  console.log("deleted movies from my list", result);
  await page.goto(`/${language}/shows`);
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
});

test("adds movie to personal list", async ({ page, dictionary, language }) => {
  const thumbnail = page.getByTestId("thumbnail").first();
  const title = await thumbnail.getAttribute("data-title");
  await thumbnail.hover();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.myListAdd }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: dictionary.buttons.myListAdd })
    .click();
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.myListRemove }),
  ).toBeVisible();
  await dialog.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.goto(`/${language}/my-list`);
  await expect(
    page.getByTestId("thumbnail").and(page.locator(`[data-title="${title}"]`)),
  ).toBeVisible();
});

test("removes movie from personal list", async ({
  page,
  dictionary,
  language,
}) => {
  const thumbnail = page.getByTestId("thumbnail").first();
  const title = await thumbnail.getAttribute("data-title");
  await thumbnail.hover();
  let dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.myListAdd }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: dictionary.buttons.myListAdd })
    .click();
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.myListRemove }),
  ).toBeVisible();
  await dialog.press("Escape");
  await page.goto(`/${language}/my-list`);
  await page
    .getByTestId("thumbnail")
    .and(page.locator(`[data-title="${title}"]`))
    .hover();
  dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.myListRemove }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: dictionary.buttons.myListRemove })
    .click();
  // closes dialog after removing from my list
  await expect(dialog).not.toBeVisible();

  await expect(page.locator(`[data-title="${title}"]`)).not.toBeVisible();
});
