import { test, expect } from "@playwright/test";

test.describe("Home Page Visual Regression", () => {
  test("should match Figma design on desktop (web)", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for all sections to load
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#detalles")).toBeVisible();
    await expect(page.locator("#gift-list")).toBeVisible();
    await expect(page.locator("#fotos")).toBeVisible();
    await expect(page.locator("#asistencia")).toBeVisible();
    await expect(page.locator("#gracias")).toBeVisible();

    // TODO: Add screenshot comparison once Figma baseline is established
    // await expect(page).toHaveScreenshot('home-web.png');
  });

  test("should match Figma design on tablet", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 800, height: 1024 });

    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#detalles")).toBeVisible();

    // TODO: Add screenshot comparison once Figma baseline is established
    // await expect(page).toHaveScreenshot('home-tablet.png');
  });

  test("should match Figma design on mobile", async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#detalles")).toBeVisible();

    // TODO: Add screenshot comparison once Figma baseline is established
    // await expect(page).toHaveScreenshot('home-mobile.png');
  });

  test("should have all 6 sections visible", async ({ page }) => {
    await page.goto("/");

    const sections = [
      "#hero",
      "#detalles",
      "#gift-list",
      "#fotos",
      "#asistencia",
      "#gracias",
    ];

    for (const section of sections) {
      await expect(page.locator(section)).toBeVisible();
    }
  });
});
