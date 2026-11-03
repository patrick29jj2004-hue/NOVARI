import { expect, test } from "@playwright/test";

test("homepage and service navigation work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tu negocio merece");
  await page
    .getByRole("navigation", { name: "Navegación principal" })
    .getByRole("link", { name: "Servicios", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Soluciones digitales");
});

for (const [slug, name] of [
  ["restaurant", "MAREA"],
  ["beauty", "ATELIER"],
  ["fashion", "AUREN"],
  ["corporate", "VERTEX"],
] as const) {
  test(`${name} opens as a clearly labeled concept demo`, async ({ page }) => {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    await expect(page.getByText(/Proyecto conceptual — demo interactiva/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Volver a NOVARY/ })).toBeVisible();
  });
}

test("language switch preserves the current project page", async ({ page }) => {
  await page.goto("/work/beauty");
  await page.getByRole("link", { name: "Cambiar a inglés" }).click();
  await expect(page).toHaveURL(/\/en\/work\/beauty$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "ATELIER", exact: true })).toBeVisible();
});

test("English routes include localized meta descriptions", async ({ page }) => {
  for (const route of [
    "/en",
    "/en/services",
    "/en/work",
    "/en/pricing",
    "/en/about",
    "/en/contact",
    "/en/catalog",
    "/en/privacy",
    "/en/terms",
    "/en/services/web-design",
    "/en/work/fashion",
  ]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
  }
});

test("mobile and tablet layouts do not overflow horizontally", async ({ page }) => {
  for (const [route, width, height] of [
    ["/", 320, 740],
    ["/work/fashion", 390, 844],
    ["/work/fashion", 768, 1024],
    ["/", 1440, 900],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(route);
    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    expect(fitsViewport, `${route} at ${width}px`).toBe(true);
  }
});

test("restaurant concept filters its menu and submits a local-only table request", async ({ page }) => {
  await page.goto("/work/restaurant");
  await page.getByRole("button", { name: "Postres", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Mousse de cacao" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pesca del día" })).toHaveCount(0);

  const form = page.locator("form").last();
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await form.getByLabel("Elige una opción").selectOption({ label: "Reserva para cena" });
  await form.getByLabel("Correo electrónico").fill("qa@example.com");
  await form.getByRole("button", { name: "Probar solicitud" }).click();
  await expect(page.getByText("Solo demo: no se envió ni registró ninguna solicitud.")).toBeVisible();
});

test("beauty and corporate demo forms validate and remain local", async ({ page }) => {
  for (const [route, option] of [
    ["/work/beauty", "Color"],
    ["/work/corporate", "E-commerce"],
  ] as const) {
    await page.goto(route);
    const form = page.locator("form").last();
    expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
    await form.getByLabel("Elige una opción").selectOption({ label: option });
    await form.getByLabel("Correo electrónico").fill("qa@example.com");
    await form.getByRole("button", { name: "Probar solicitud" }).click();
    await expect(page.getByText("Solo demo: no se envió ni registró ninguna solicitud.")).toBeVisible();
  }
});

test("pricing avoids fixed prices and invites a scoped quote", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("alcance");
  await expect(page.locator(".package-card .price-note")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "Consultar por WhatsApp" })).toHaveCount(4);
});

test("fashion filters products and updates the persistent demo cart", async ({ page }) => {
  await page.goto("/work/fashion");
  await page.getByRole("button", { name: "Accesorios" }).click();
  await expect(page.getByRole("heading", { name: "Studio canvas tote" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Forma wool coat" })).toHaveCount(0);
  await page.getByRole("button", { name: "Añadir", exact: true }).first().click();
  await expect(page.getByText("S/ 79.00")).toBeVisible();
  await page.reload();
  await expect(page.getByText("S/ 79.00")).toBeVisible();
});

test("mobile navigation opens and follows a destination", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("link", { name: "Contacto", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("contact form validates fields and reports provider rejection honestly", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "El envío no está configurado. Usa el correo o WhatsApp indicado en esta página." }),
    });
  });
  await page.goto("/contact");
  const form = page.locator("form");
  expect(await form.evaluate((element) => (element as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByLabel("Nombre *").fill("Alex Sample");
  await page.getByLabel("Correo electrónico *").fill("alex@example.com");
  await page.getByLabel("País *").fill("Perú");
  await page.getByLabel("Tipo de proyecto *").selectOption("Sitio web");
  await page.getByLabel("Cuéntanos sobre tu proyecto *").fill("Buscamos una web para presentar nuevos servicios profesionales.");
  await page.getByRole("button", { name: "Enviar detalles del proyecto" }).click();
  await expect(page.getByText(/El envío no está configurado/)).toBeVisible();
});

test("catalog contains ten printable sheets", async ({ page }) => {
  await page.goto("/catalog");
  await expect(page.locator(".catalog-sheet")).toHaveCount(10);
  await expect(page.getByRole("button", { name: /Imprimir/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Descargar PDF" })).toHaveAttribute(
    "href",
    "/catalog/novary-catalog-es.pdf",
  );
  const pdfResponse = await page.request.get("/catalog/novary-catalog-es.pdf");
  expect(pdfResponse.ok()).toBe(true);
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
});
