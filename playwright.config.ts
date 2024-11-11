import {  devices, PlaywrightTestConfig } from "@playwright/test";
import {  defineBddConfig } from 'playwright-bdd';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 import * as dotenv from 'dotenv';
 import path from 'path';
 import logger from './src/utils/logger';


 dotenv.config({ path: path.resolve(__dirname, '.env') });

const validBrowserTypes = ['chrome', 'edge', 'firefox', 'webkit'];
const browserType = process.env['BROWSER_TYPE'] ?? 'chrome';
const defaultRetryNumber = 2;

if (!browserType || !validBrowserTypes.includes(browserType)) {
  logger.error(`Invalid BROWSER_TYPE: "${browserType}". Valid options are: "${validBrowserTypes.join(', ')}"`);
}

const testDir: string = defineBddConfig({
  features: './src/features/**/*.feature',
  steps: ['./src/step-definitions/**/*.ts', './src/hooks/*.ts', './src/utils/fixtures.ts'],
  featuresRoot: './src/features',
  quotes: 'single',
});


const defaultConfig: PlaywrightTestConfig = {
  testDir: testDir,
  globalSetup: require.resolve('./src/setup/setup-global.ts'),
  fullyParallel: true,
  forbidOnly: !!(process.env['CI'] ?? ''),
  retries: process.env['CI'] != null ? defaultRetryNumber : 0,
  workers: process.env['CI'] != null ? 1 : undefined,
  timeout: 30000,
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env['BASE_URL'],
    headless: process.env['HEADLESS'] === 'true',
    trace: 'on-first-retry',
    testIdAttribute: 'id',
  },
  ...(browserType === 'chrome'
    ? { ...devices['Desktop Chrome'], channel: 'chrome' }
    : browserType === 'edge'
    ? { ...devices['Desktop Edge'], channel: 'msedge' }
    : browserType === 'firefox'
    ? devices['Desktop Firefox']
    : browserType === 'webkit'
    ? devices['Desktop Safari']
    : devices['Desktop Chrome']),
  projects: [

    {
      name: 'chrome',
      testDir: testDir,
      dependencies: ['setup'],
      use: {},
    },
  ],
};

export default defaultConfig;