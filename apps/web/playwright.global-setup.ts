import fs from 'fs';
import path from 'path';

// Ensure TransformStream & other web streams exist for Playwright usage
try {
  // require the ponyfill and attach to global
  const ponyfill = require('web-streams-polyfill');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.TransformStream = ponyfill.TransformStream;
  // Also attach ReadableStream/WritableStream for safety:
  // @ts-ignore
  global.ReadableStream = ponyfill.ReadableStream;
  // @ts-ignore
  global.WritableStream = ponyfill.WritableStream;
} catch (e) {
  // ignore for environments where this cannot be applied
  // the tests will still run in Playwright environment
  // but Playwright often requires TransformStream to be present.
  console.warn('web-streams-polyfill not available: ', e?.message ?? e);
}

export default async function globalSetup() {
  // nothing else required here — polyfill applied above
}

