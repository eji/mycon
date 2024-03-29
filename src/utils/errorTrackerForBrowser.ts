/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import * as SentryBrowser from '@sentry/browser';
import { RewriteFrames } from '@sentry/integrations';
import { Severity } from '@sentry/browser';
import isBrowser from './isBrowser';

export const initErrorTracker = (): void => {
  if (isBrowser()) {
    SentryBrowser.init({
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
  return SentryBrowser.captureException(exception);
};

export const captureMessage = (
  message: string,
  level?: Severity | undefined
): string => {
  console.info(message);
  return SentryBrowser.captureMessage(message, level);
};

const flushTimeout = 2000;
export const flush = async (): Promise<boolean> => {
  const result = await SentryBrowser.flush(flushTimeout);
  return result;
};
