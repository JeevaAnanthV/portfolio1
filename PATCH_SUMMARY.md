# ArchitectureViewer Hydration Fix - Patch Summary

## Files Modified

1. **apps/web/components/ArchitectureViewerClient.tsx**
   - Added error boundary (`ClientErrorBoundary` and `ErrorCatcher`) to capture and display runtime errors
   - Added URL normalization to ensure absolute paths for fetch requests
   - Improved error handling for fetch operations with console logging
   - Fixed snippet URL construction to extract slug from architecture.json URL path
   - Added fallback content for missing snippets
   - All test-ids already present: `architecture-viewer`, `layer-button-{index}`, `snippet-content`

2. **apps/web/src/app/layout.tsx**
   - Added client-side error collector script (`window.__clientErrors__`) for debugging in E2E tests
   - Script captures `window.onerror` events for Playwright inspection

3. **apps/web/src/app/projects/[slug]/page.tsx**
   - No changes (kept using ArchitectureViewer wrapper which is already a client component with dynamic import)

## Root Cause Analysis

The ArchitectureViewer component uses Next.js `dynamic()` import with `ssr: false` in a client component wrapper. In production builds, the component shows "Loading Architecture..." but never hydrates, causing 500 errors when Next.js tries to load the client component chunks.

## Applied Fixes

1. **Error Boundary**: Added client-side error boundary to catch and log runtime errors that prevent hydration
2. **URL Normalization**: Ensured all fetch URLs use absolute paths starting with `/content/...`
3. **Error Logging**: Added console.error logging for fetch failures to aid debugging
4. **Client Error Collection**: Added `window.__clientErrors__` global for E2E test debugging

## Remaining Issue

The component still shows "Loading Architecture..." in production but doesn't hydrate. The 500 errors suggest Next.js/Turbopack is having issues serving the client component chunks in production mode. This appears to be a Next.js build/bundling issue rather than application code.

## Test Status

- ✅ Unit tests: All passing (7/7)
- ✅ Build: Successful
- ❌ E2E: Failing due to component not hydrating (shows loading state but never renders)

## Next Steps (if issue persists)

1. Check Next.js/Turbopack production build configuration
2. Verify client component chunks are being generated and served correctly
3. Consider using a different approach for client-only components (e.g., removing the wrapper layer)
4. Check Next.js version compatibility with dynamic imports in production

