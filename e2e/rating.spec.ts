import { expect, test } from "@/e2e/fixture";
import { giveRating } from "~/lib/db/rating";
import prisma from "~/lib/prisma";

test.beforeEach(async ({ page, language, profileId }) => {
  //  reset ratings

  await prisma.profileMovieRating.deleteMany({ where: { profileId } });
  await page.goto(`/${language}/shows`);
  await expect(
    page.getByRole("button", { name: "account-button" }),
  ).toBeVisible();
});

test("optimistically updates rating in the modal", async ({
  page,
  dictionary,
  language,
}) => {
  const thumbnail = page.getByTestId("thumbnail").first();
  await thumbnail.hover();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const thumbsUp = dialog.getByRole("button", {
    name: dictionary.buttons.thumbsUp,
  });
  await expect(thumbsUp).toBeVisible();
  await expect(thumbsUp).not.toHaveAttribute("aria-pressed", "true");
  await thumbsUp.click();
  await expect(thumbsUp).toHaveAttribute("aria-pressed", "true");
  await dialog
    .getByRole("button", { name: dictionary.buttons.thumbsDown })
    .click();
  await expect(thumbsUp).toHaveAttribute("aria-pressed", "false");
  await expect(
    dialog.getByRole("button", { name: dictionary.buttons.thumbsDown }),
  ).toHaveAttribute("aria-pressed", "true");

  await dialog.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("adds rating to the profile page", async ({
  page,
  dictionary,
  language,
  profileId,
}) => {
  const thumbnail = page.getByTestId("thumbnail").first();
  await thumbnail.hover();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const thumbsUp = dialog.getByRole("button", {
    name: dictionary.buttons.thumbsUp,
  });
  await expect(thumbsUp).toBeVisible();
  await expect(thumbsUp).not.toHaveAttribute("aria-pressed", "true");
  await thumbsUp.click();
  await dialog.press("Escape");
  await page.goto(`/${language}/account/profiles/${profileId}/ratings/`);
  await expect(
    page.getByRole("button", {
      name: dictionary.buttons.thumbsUp,
    }),
  ).toHaveAttribute("aria-pressed", "true");

  await expect(dialog).not.toBeVisible();
});
test("remove rating from the profile page", async ({
  page,
  dictionary,
  language,
  profileId,
}) => {
  await giveRating(profileId, "movie-1339713", "UP");

  await page.goto(`/${language}/account/profiles/${profileId}/ratings/`);
  const thumbsUp = page.getByRole("button", {
    name: dictionary.buttons.thumbsUp,
  });
  await expect(thumbsUp).toHaveAttribute("aria-pressed", "true");
  await thumbsUp.click();
  await expect(thumbsUp).not.toBeVisible();
});

test("change rating from the profile page", async ({
  page,
  dictionary,
  language,
  profileId,
}) => {
  await giveRating(profileId, "movie-1339713", "UP");

  await page.goto(`/${language}/account/profiles/${profileId}/ratings/`);
  const thumbsUp = page.getByRole("button", {
    name: dictionary.buttons.thumbsUp,
  });
  await expect(thumbsUp).toHaveAttribute("aria-pressed", "true");
  const thumbsDown = page.getByRole("button", {
    name: dictionary.buttons.thumbsDown,
  });
  await thumbsDown.click();
  await expect(thumbsUp).toHaveAttribute("aria-pressed", "false");
  await expect(thumbsDown).toHaveAttribute("aria-pressed", "true");
});
