import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("loads the chat UI", { tag: "@smoke" }, async ({ page }) => {
    await page.goto("/");

    // Seeded demo conversation renders.
    await expect(
      page.getByText("Can you explain how to use React hooks effectively?"),
    ).toBeVisible();

    // Prompt input is ready for a new message.
    await expect(
      page.getByPlaceholder("What would you like to know?"),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  });
});
