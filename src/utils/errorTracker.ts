/* eslint-disable no-underscore-dangle */
import * as SentryNode from '@sentry/node';
import * as SentryBrowser from '@sentry/browser';
import { RewriteFrames } from '@sentry/integrations';
import isBrowser from './isBrowser';

export const initErrorTracker = (): void => {
  if (isBrowser()) {
    SentryBrowser.init({
      dsn:
        'https://90153cb5f80a4ca3aec4a2991651994a@o397219.ingest.sentry.io/5251500',
      integrations: [
        new RewriteFrames({
          root: global.__rootdir__,
        }),
      ],
    });
  } else {
    SentryNode.init({
      dsn:
        'https://90153cb5f80a4ca3aec4a2991651994a@o397219.ingest.sentry.io/5251500',
      integrations: [
        new RewriteFrames({
          root: global.__rootdir__,
        }),
      ],
    });
  }
};

export const captureException = isBrowser()
  ? SentryBrowser.captureException
  : SentryNode.captureException;

const flushTimeout = 2000;
export const flush = async (): Promise<boolean> => {
  const result = isBrowser()
    ? await SentryBrowser.flush(flushTimeout)
    : await SentryNode.flush(flushTimeout);
  return result;
};
