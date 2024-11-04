import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";

const url = "https://www.webdriveruniversity.com/";

Given("I navigate to the webdriveruniversity homepage", async () => {
  //Access URL
  await pageFixture.page.goto(url);
});

When("I click on the contact us button", async () => {
  //await page.pause();
  const contactUs_Button = await pageFixture.page.getByRole("link", {
    name: "CONTACT US Contact Us Form",
  });
  await contactUs_Button.click();
});

When("I click on the login portal button", async () => {
  const login_Button = await pageFixture.page.getByRole("link", {
    name: "LOGIN PORTAL Login Portal",
  });
  await login_Button.click();
});
