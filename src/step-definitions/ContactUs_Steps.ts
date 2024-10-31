import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";

When("I type a first name", async () => {
  await pageFixture.page.getByPlaceholder("First Name").fill("Joe");
});

When("I type a last name", async () => {
  await pageFixture.page.getByPlaceholder("Last Name").fill("Blogs");
});

When("I enter an email address", async () => {
  await pageFixture.page
    .getByPlaceholder("Email Address")
    .fill("joe_blogs123@example.com");
});

When("I type a comment", async () => {
  await pageFixture.page.getByPlaceholder("Comments").fill("Hello world!");
});

When("I click on the submit button", async () => {
  //wait for the button to load
  await pageFixture.page.waitForSelector('input[value="SUBMIT"]');

  //Once loaded, click on the button
  await pageFixture.page.click('input[value="SUBMIT"]');
});

Then(
  "I should be presented with a successful contact us submission message",
  async () => {
    //wait for the header text element
    await pageFixture.page.waitForSelector("#contact_reply h1", {
      timeout: 60000,
    });

    //get the text from the h1 element
    const text = await pageFixture.page.innerText("#contact_reply h1");

    // Use Playwright's 'expect' function to assert the text of the h1 element
    expect(text).toBe("Thank You for your Message!");
  }
);
