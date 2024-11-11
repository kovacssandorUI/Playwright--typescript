import * as dotenv from 'dotenv';
import logger from '../utils/logger';

/**
 * Performs global setup tasks before running tests.
 *
 * Initializes the environment by loading
 * environment variables from a `.env` file.
 */
async function globalSetup(): Promise<void> {
  logger.debug('Global setup running');

  dotenv.config();

  logger.debug('Global setup completed');
}

export default globalSetup;
