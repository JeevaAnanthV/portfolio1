import '@testing-library/jest-dom'

// polyfill for TransformStream so Playwright/Jest don't crash
try {
  // require the ponyfill and attach to global
  const ponyfill = require('web-streams-polyfill');
  global.TransformStream = ponyfill.TransformStream;
  global.ReadableStream = ponyfill.ReadableStream;
  global.WritableStream = ponyfill.WritableStream;
} catch (e) {
  // ignore
}

// Mock next/dynamic so client-only components don't cause asynchronous load in tests.
// This mock returns the component synchronously.
jest.mock('next/dynamic', () => {
  return (loader, options) => {
    // If loader is a function that returns a promise (dynamic import), call it synchronously
    if (typeof loader === 'function') {
      try {
        const maybePromise = loader();
        // If it's a promise (dynamic import), try to resolve it synchronously
        if (maybePromise && typeof maybePromise.then === 'function') {
          // Extract the module path from the loader function string
          const loaderStr = loader.toString();
          const match = loaderStr.match(/import\(['"](.*?)['"]\)/);
          if (match) {
            const modulePath = match[1];
            try {
              // Resolve and require the module synchronously
              const resolvedPath = require.resolve(modulePath);
              const mod = require(resolvedPath);
              return mod.default || mod;
            } catch (e) {
              // If module can't be resolved, return a component that renders the loading state
              return options?.loading || (() => null);
            }
          }
          // If we can't extract the path, return loading component
          return options?.loading || (() => null);
        }
        // If it's not a promise, return it directly
        if (maybePromise && maybePromise.default) {
          return maybePromise.default;
        }
        return maybePromise;
      } catch (e) {
        // loader threw; return loading component if available
        return options?.loading || (() => null);
      }
    }
    // If loader is not a function, return it directly
    return loader;
  };
});
