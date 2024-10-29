import { Given, When, Then } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let browser: Browser; // Playwright browser instance
let page: Page;
let context: any;

const url = "http://www.webdriveruniversity.com/";

Given("I navigate the WebdriverUiversity homepage", async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  page = await context.newPage();
  await page.goto(url);
});

When("I click on the contact us button", async () => {
  await page.pause();
  const contactUsButton = await page.$("#contact-us");
  await contactUsButton?.click();
});
