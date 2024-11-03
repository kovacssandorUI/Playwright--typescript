import { When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

When(
  "I type the username {string} and password {string}",
  async (username, password) => {
    //await pageFixture.page.click('input[name="username"]');
    await pageFixture.page.getByPlaceholder("Username").fill(username);

    await pageFixture.page.getByPlaceholder("Password").fill(password);
    //await pageFixture.page.fill('input[name="username"]', username);
    // await pageFixture.page.fill('input[name="password"]', password);
  }
);

When("I click on the Login button", async () => {
  //await pageFixture.page.click('input[value="SUBMIT"]');
  const login_Button = pageFixture.page.locator("#login-button");
  await login_Button.click();
});

Then("Should be popup with text {string}", async (string) => {
  await pageFixture.page.waitForSelector(".alert", { timeout: 60000 });
  const text = await pageFixture.page.innerText(".alert");
  expect(text).toBe(string);
});
