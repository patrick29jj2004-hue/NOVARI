import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(root, "public", "catalog");
const port = Number(process.env.NOVARY_PREVIEW_PORT || 3178);
const baseURL = process.env.NOVARY_PREVIEW_URL || `http://127.0.0.1:${port}`;
const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");

async function waitForServer(server) {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js preview server exited with code ${server.exitCode}.`);
    }
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      await new Promise((resolveWait) => setTimeout(resolveWait, 800));
      continue;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 800));
  }
  throw new Error(`Could not reach ${baseURL}. Check the local Next.js server.`);
}

await mkdir(outputDirectory, { recursive: true });
const server = spawn(
  process.execPath,
  [nextCli, "dev", "--hostname", "127.0.0.1", "--port", String(port)],
  { cwd: root, stdio: "inherit", windowsHide: true },
);
let browser;

try {
  await waitForServer(server);
  browser = await chromium.launch();
  for (const locale of ["es", "en"]) {
    const route = locale === "es" ? "/catalog" : "/en/catalog";
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      javaScriptEnabled: false,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(new URL(route, baseURL).toString(), {
      waitUntil: "load",
    });
    if (!response?.ok) throw new Error(`Catalog route ${route} returned ${response?.status ?? "no response"}.`);
    await page.locator(".catalog-sheet").first().waitFor({ state: "visible" });
    const pageCount = await page.locator(".catalog-sheet").count();
    if (pageCount !== 10) throw new Error(`${route} rendered ${pageCount} catalog sheets; expected 10.`);
    await page.emulateMedia({ media: "print" });
    const overflow = await page.locator(".catalog-sheet").evaluateAll((sheets) =>
      sheets.some((sheet) => sheet.scrollHeight > sheet.clientHeight + 4),
    );
    if (overflow) throw new Error(`${route} contains content that overflows an A4 sheet.`);
    const fanamiFilePath = join(outputDirectory, `fanami-catalog-${locale}.pdf`);
    await page.pdf({
      path: fanamiFilePath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    const legacyFilePath = join(outputDirectory, `novary-catalog-${locale}.pdf`);
    await page.pdf({
      path: legacyFilePath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    const document = await PDFDocument.load(await readFile(fanamiFilePath));
    const pdfPages = document.getPageCount();
    if (pdfPages !== 10) {
      throw new Error(`${fanamiFilePath} has ${pdfPages} PDF pages; expected 10.`);
    }
    const wrongPageSize = document.getPages().some((pdfPage) => {
      const { width, height } = pdfPage.getSize();
      return Math.abs(width - 595.28) > 2 || Math.abs(height - 841.89) > 2;
    });
    if (wrongPageSize) throw new Error(`${fanamiFilePath} contains a page that is not A4 portrait.`);
    if (errors.length) throw new Error(`Browser errors on ${route}: ${errors.join("; ")}`);
    console.log(`Created ${fanamiFilePath} (${pdfPages} pages).`);
    await page.close();
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.toLowerCase().includes("executable")) {
    throw new Error(`${message}\nInstall Chromium with: npx playwright install chromium`);
  }
  throw error;
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    server.kill();
    await new Promise((resolveExit) => {
      const timeout = setTimeout(resolveExit, 5_000);
      server.once("exit", () => {
        clearTimeout(timeout);
        resolveExit();
      });
    });
  }
}
