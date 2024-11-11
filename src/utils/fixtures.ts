import { test as baseTest, createBdd } from 'playwright-bdd';
//import PageHelper from './PageHelper.ts';
//import Assertions from './Assertions';
//import RequestHelper from './RequestHelper';
import logger from './logger';
import { Page } from '@playwright/test';

interface MyFixtures {
//  pageHelper: PageHelper;
//  assertions: Assertions;
//  requestHelper: RequestHelper;
  unauthorizedPage: Page;
}

/**
 * Extends the base test with custom fixtures for the Entities Management Web E2E tests.
 *
 * @typeParam MyFixtures - The type of the custom fixtures.
 *
 * @property pageHelper - Provides a helper for page interactions.
 * @property assertions - Provides custom assertions for the tests.
 * @property requestHelper - Provides a helper for handling HTTP requests.
 *
 * @example
 * ```typescript
 * test('example test', async ({ pageHelper, assertions, requestHelper }) => {
 *   // Use the pageHelper, assertions, and requestHelper in your test
 * });
 * ```
 */
export const test = baseTest.extend<MyFixtures>({
  unauthorizedPage: [
    async ({ browser, $tags, page }, use) => {
      if ($tags.includes('@unauthorized')) {
        const context = await browser.newContext({
          storageState: { cookies: [], origins: [] },
        });
        const unauthorizedPage = await context.newPage();
        await use(unauthorizedPage);
        await unauthorizedPage.close();
        await context.close();
      } else {
        await use(page);
      }
    },
    { auto: true },
  ],
//  pageHelper: async ({ page, $testInfo }, use) => {
//   const pageHelper = new PageHelper(page);
//
//    logger.logTestInfo($testInfo);

//    await use(pageHelper);
//  },
//  assertions: async ({ page }, use) => {
//    const assertions = new Assertions(page);
//    await use(assertions);
//  },
//  requestHelper: async ({ request }, use) => {
//    const requestHelper = new RequestHelper(request);
//    await use(requestHelper);
//  },
});

export const { Given, When, Then, BeforeAll } = createBdd(test);
