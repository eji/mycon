/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import * as SentryNode from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Severity } from '@sentry/node';
import isBrowser from './isBrowser';

export const initErrorTracker = (): void => {
  if (!isBrowser()) {
    SentryNode.init({
      dsn:
        'https://90153cb5f80a4ca3aec4a2991651994a@o397219.ingest.sentry.io/5251500',
      // integrations: [
      //   new RewriteFrames({
      //     root: global.__rootdir__,
      //   }),
      // ],
    });
  }
};

export const captureException = (exception: unknown): string => {
  console.error(exception);
  return SentryNode.captureException(exception);
};

export const captureMessage = (
  message: string,
  level?: Severity | undefined
): string => {
  console.info(message);
  return SentryNode.captureMessage(message, level);
};

const flushTimeout = 2000;
export const flush = async (): Promise<boolean> => {
  const result = await SentryNode.flush(flushTimeout);
  return result;
};
