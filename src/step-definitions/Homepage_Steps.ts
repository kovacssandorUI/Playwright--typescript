import { Given, When } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";

let browser: Browser; //Represents the browser instance (e.g., Chrome, Firefox) opened by Playwright.
let context: any; //Represents a browser context (a separate browsing session); Each context has its own cookies, cache, and storage.
let page: Page; //Represents a single web page within a context

const url = "https://www.webdriveruniversity.com/";

Given("I navigate to the webdriveruniversity homepage", async () => {
  //Setup browser instance:
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  page = await context.newPage();

  //Access URL
  await page.goto(url);
});

When("I click on the contact us button", async () => {
  //await page.pause();
  const contactUs_Button = await page.getByRole("link", {
    name: "CONTACT US Contact Us Form",
  });
  await contactUs_Button.click();
});

When("I switch to the new browser tab", async () => {
  page = await context.waitForEvent("page"); //reintialise the page > new tab > page
  await page.bringToFront();
});
