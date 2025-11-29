#!/bin/bash
set -e

# Generate local artifacts (PDFs and screenshots)
# Usage: ./scripts/generate_local_artifacts.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ARTIFACTS_DIR="$REPO_ROOT/artifacts"

echo "📦 Generating local artifacts..."

# Ensure artifacts directory exists
mkdir -p "$ARTIFACTS_DIR"

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

# Install Playwright browsers if needed
echo "🔧 Installing Playwright browsers..."
cd "$REPO_ROOT/apps/web" || exit 1
npx playwright install --with-deps chromium || echo "⚠️  Playwright install had issues, continuing..."

# Check if server is running
PREVIEW_URL="${PREVIEW_URL:-http://localhost:3000}"
if ! curl -s "$PREVIEW_URL" > /dev/null 2>&1; then
    echo "⚠️  Server not running at $PREVIEW_URL"
    echo "   Please start the server first: cd apps/web && npm run start"
    echo "   Or set PREVIEW_URL environment variable"
    exit 1
fi

# Generate PDFs and screenshots
echo "📸 Generating PDFs and screenshots..."
cd "$REPO_ROOT"
node scripts/build_pdf_playwright.js

# Generate checksums
echo "🔐 Generating checksums..."
cd "$ARTIFACTS_DIR"
sha256sum *.png *.pdf 2>/dev/null | tee checksums_generated.txt || echo "⚠️  No artifacts found to checksum"

echo "✅ Artifacts generated in $ARTIFACTS_DIR"
ls -lh "$ARTIFACTS_DIR"

