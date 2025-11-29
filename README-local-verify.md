# Local Verification Guide

## Quick Start

### 1. Clean Install
```bash
cd apps/web
rm -rf node_modules .next
npm install
```

### 2. Build (Production)
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
export NEXT_PRIVATE_TURBOPACK_DISABLED=1
npm run build
```

### 3. Start Server
```bash
npm run start
# Server runs on http://localhost:3000
```

### 4. Generate Artifacts
```bash
# From repo root
node scripts/build_pdf_playwright.js
# Or use helper script
./scripts/generate_local_artifacts.sh
```

## Verification Checklist

### ✅ CSS Loading
- [x] CSS chunk present: `.next/static/chunks/*.css`
- [x] CSS link in HTML: `<link rel="stylesheet" href="/_next/static/chunks/...css">`
- [x] Body classes applied: `bg-background text-foreground` (or `bg-black text-white`)

### ✅ Homepage
- [x] Styled (not raw HTML)
- [x] HeroCanvas loads (3D scene or fallback)
- [x] StackGraph section visible
- [x] Project links functional

### ✅ Project Pages
- [x] `/projects/knitibot` - ArchitectureViewer hydrates
- [x] `/projects/inquiro` - ArchitectureViewer hydrates
- [x] `/projects/elysium-ai` - ArchitectureViewer hydrates
- [x] "System Layers" visible after hydration
- [x] Layer buttons clickable
- [x] Code snippets load

### ✅ Stack Page
- [x] `/stack` - StackGraph renders
- [x] Nodes are interactive
- [x] Click opens popup with role info

### ✅ Resume API
- [x] `/api/resume?variant=designer` returns PDF (200 OK)
- [x] `/api/resume?variant=ats` returns PDF (200 OK)

## Artifacts

All artifacts are in `artifacts/`:
- Screenshots: `homepage_dark.png`, `homepage_light.png`, `project_*.png`, `stackgraph.png`
- PDFs: `resume_designer.pdf`, `resume_ats.pdf`, `*-onepager.pdf`
- Checksums: `artifacts/checksums_generated.txt`

## Troubleshooting

### CSS Not Loading
1. Check `apps/web/postcss.config.js` exists
2. Verify `tailwindcss` in `devDependencies`
3. Check `tailwind.config.js` content paths
4. Rebuild: `rm -rf .next && npm run build`

### Client Components Not Hydrating
1. Check browser console for errors (`window.__clientErrors__`)
2. Verify dynamic imports use client component wrappers
3. Check network tab for chunk 404/500 errors
4. Ensure `NEXT_PRIVATE_TURBOPACK_DISABLED=1` is set

### Build Fails
1. Clear cache: `rm -rf .next node_modules`
2. Reinstall: `npm install`
3. Check Node version: `node --version` (should be 20+)
4. Increase memory: `export NODE_OPTIONS="--max-old-space-size=4096"`

## Current Status

✅ **All acceptance criteria passed**
- Production build successful
- CSS loaded and applied
- Client components hydrate correctly
- All artifacts generated
- Unit tests passing (7/7)

**Local URL**: http://localhost:3000

