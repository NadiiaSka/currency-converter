import { test, expect } from "@playwright/test";

const selectCurrency = async (page, fieldName, optionText) => {
  const field = page.getByRole("combobox", {
    name: new RegExp(fieldName, "i"),
  });

  await field.click();
  await page
    .getByRole("option", { name: new RegExp(`^${optionText}$`, "i") })
    .click();
};

test.describe("Currency converter visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api.fxratesapi.com/latest**", async (route) => {
      const url = new URL(route.request().url());
      const amount = Number(url.searchParams.get("amount") ?? 0);
      const base = url.searchParams.get("base");
      const target = url.searchParams.get("currencies");
      const rates = { USD: 1, UAH: 38.2, EUR: 0.92, GBP: 0.78 };
      const converted = (amount * rates[target]) / rates[base];

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          rates: { [target]: Number(converted.toFixed(2)) },
        }),
      });
    });

    await page.goto("/");
  });

  test("matches the initial page snapshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("currency-converter-initial.png", {
      fullPage: true,
    });
  });

  test("matches the converted result snapshot", async ({ page }) => {
    await page.getByLabel("Amount").fill("100");
    await selectCurrency(page, "from", "USD - United States");
    await selectCurrency(page, "to", "UAH - Ukraine");
    await expect(page.getByText(/3,?\s*820.*UAH/i)).toBeVisible();
    await page.locator("body").click({ position: { x: 1, y: 1 } });

    await expect(page).toHaveScreenshot("currency-converter-converted.png", {
      fullPage: true,
    });
  });
});
