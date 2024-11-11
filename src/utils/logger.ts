/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { TestInfo } from '@playwright/test';

dotenv.config();

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const currentLogLevel: LogLevel = (process.env['LOG_LEVEL'] as LogLevel) || 'INFO';

const workerIndex = (Number(process.env['TEST_PARALLEL_INDEX']) ?? 0) + 1;

//Log level priorities
const logLevels: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

/**
 * Determines if a message at the specified log level should be logged.
 *
 * @param level - The log level to check.
 * @returns `true` if the message should be logged, `false` otherwise.
 */
function shouldLog(level: LogLevel): boolean {
  return logLevels[level] >= logLevels[currentLogLevel];
}

//Logging functions with colors
const logger = {
  debug: (message: string): void => {
    if (shouldLog('DEBUG')) {
      console.log(`\x1b[34m[WORKER-${workerIndex}][DEBUG] ${message}\x1b[0m`); //Blue
    }
  },
  info: (message: string): void => {
    if (shouldLog('INFO')) {
      console.log(`\x1b[32m[WORKER-${workerIndex}][INFO ] ${message}\x1b[0m`); //Green
    }
  },
  warn: (message: string): void => {
    if (shouldLog('WARN')) {
      console.log(`\x1b[33m[WORKER-${workerIndex}][WARN ] ${message}\x1b[0m`); //Yellow
    }
  },
  error: (message: string): void => {
    if (shouldLog('ERROR')) {
      console.log(`\x1b[31m[WORKER-${workerIndex}][ERROR] ${message}\x1b[0m`); //Red
      throw new Error();
    }
  },
  shouldLog: (level: LogLevel): boolean => {
    return shouldLog(level);
  },
  logTestInfo: (testInfo: TestInfo): void => {
    if (shouldLog('INFO')) {
      console.group(`[WORKER-${workerIndex}] Current test details:`);
      logger.info(`Title: ${testInfo.title}`);
      logger.info(`Tags: ${testInfo.tags}`);
      logger.info(`Project name: ${testInfo.project.name}`);
      //TODO: Add more test + browser related info
      console.groupEnd();
    }
  },
};

export default logger;
