import { test, expect } from "@playwright/test";

test.describe("RSVP Placeholder Page", () => {
  test("should display placeholder message", async ({ page }) => {
    await page.goto("/rsvp");

    await expect(page.locator("h1")).toContainText(
      "Confirmación de Asistencia"
    );
    await expect(page.getByText("Próximamente disponible")).toBeVisible();
  });

  test("should display WhatsApp and Telegram fallback CTAs", async ({
    page,
  }) => {
    await page.goto("/rsvp");

    await expect(page.getByRole("link", { name: /WhatsApp/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Telegram/i })).toBeVisible();
  });

  test("should have back to home link", async ({ page }) => {
    await page.goto("/rsvp");

    const backLink = page.getByRole("link", { name: /Volver al inicio/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/");
  });

  test("should maintain visual consistency with site", async ({ page }) => {
    await page.goto("/rsvp");

    // Check that Layout and Nav are present
    await expect(page.locator("nav")).toBeVisible();

    // TODO: Add screenshot comparison once baseline is established
    // await expect(page).toHaveScreenshot('rsvp-placeholder.png');
  });
});
