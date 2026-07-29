import { expect, test } from "@playwright/test";

test("home page loads an empty chat surface", async ({ page }) => {
  await page.goto("/");

  // The Scientist starts with an empty surface — no seeded demo conversation.
  await expect(
    page.getByText("Ask about your sequence data to get started"),
  ).toBeVisible();
  await expect(
    page.getByText("Can you explain how to use React hooks effectively?"),
  ).toHaveCount(0);

  // Prompt input is ready for a new message.
  await expect(
    page.getByPlaceholder("What would you like to know?"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("chat surface offers no model choice and no web search", async ({
  page,
}) => {
  await page.goto("/");

  // Anchor on the surface having actually rendered, so the assertion below
  // cannot pass against a blank or errored page.
  await expect(
    page.getByPlaceholder("What would you like to know?"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

  // The model selector and the web-search toggle were the only prompt input
  // controls rendering visible text ("GPT-4o", "Search"); every control that
  // remains is icon-only, Submit included. So any visibly-labelled control
  // here means one of them is back, under whatever name — model choice is the
  // server's per ADR-0003, and web search would route conversation content to
  // a second provider.
  const labelledControls = await page
    .locator("form")
    .getByRole("button")
    .evaluateAll((buttons) =>
      buttons.map((button) => button.textContent?.trim() ?? "").filter(Boolean),
    );
  expect(labelledControls).toEqual([]);
});
