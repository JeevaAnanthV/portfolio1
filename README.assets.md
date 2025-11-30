# Production Asset Pack

This document describes the production-ready assets added to the portfolio project for the hero section and general UI components.

## Asset Summary

### Fonts

**Inter Font Family** (Primary - Fallback from Satoshi)
- **Source**: https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip
- **License**: SIL Open Font License 1.1
- **Location**: `apps/web/public/fonts/`
- **Formats**: TTF, OTF, WOFF, WOFF2
- **Variable Font**: `Inter Variable/Inter.ttf`
- **Note**: Satoshi font from Fontshare could not be downloaded programmatically (requires manual download/authentication). Inter is used as the fallback font.

### Logos

**JV Logo** (User-Provided - PLACEHOLDER)
- **Status**: ❌ Failed to download (404 errors)
- **Expected Files**:
  - `apps/web/public/logos/jv-logo.png` (from https://files.catbox.moe/4fmm3t.png)
  - `apps/web/public/logos/jv-logo.svg` (from https://files.catbox.moe/sq2h7h.svg)
- **Action Required**: User needs to re-upload logos or provide alternative URLs. See `qa/asset-failures.md` for details.

### Backgrounds / Gradients

**Hero Gradients** (User-Provided - PLACEHOLDER)
- **Status**: ❌ Failed to download (404 errors)
- **Expected Files**:
  - `apps/web/public/assets/hero/gradients/dark-metal.png` (from https://files.catbox.moe/v2txnb.png)
  - `apps/web/public/assets/hero/gradients/purple-space.png` (from https://files.catbox.moe/0izsz5.png)
- **Action Required**: User needs to re-upload gradients or provide alternative URLs. See `qa/asset-failures.md` for details.

### HDRIs (High Dynamic Range Images)

**Poly Haven Studio HDRIs**
- **Source**: https://polyhaven.com (CC0 License)
- **Files**:
  - `apps/web/public/hdris/studio_small_04_1k.hdr` (1.7MB)
  - `apps/web/public/hdris/studio_small_08_1k.hdr` (1.5MB)
- **License**: CC0 (Public Domain)
- **Use**: Realistic lighting for 3D scenes

### 3D Models

**Khronos glTF Sample Models**
- **Source**: https://github.com/KhronosGroup/glTF-Sample-Models
- **Files**:
  - `apps/web/public/3d/damaged_helmet.glb` (3.6MB)
  - `apps/web/public/3d/avocado.glb` (8.0MB)
- **License**: CC0 (Public Domain)
- **Format**: glTF Binary (.glb)
- **Use**: Placeholder 3D models for hero section

### Icons

**Lucide Icons** (SVG)
- **Source**: https://github.com/lucide-icons/lucide
- **License**: ISC License
- **Files**:
  - `apps/web/public/assets/icons/arrow-right.svg`
  - `apps/web/public/assets/icons/menu.svg`
  - `apps/web/public/assets/icons/x.svg`
  - `apps/web/public/assets/icons/search.svg`

## Directory Structure

```
apps/web/public/
├── assets/
│   ├── hero/
│   │   ├── gradients/     # Background gradients (user-provided - currently empty)
│   │   └── textures/      # Reserved for texture maps
│   └── icons/             # Lucide SVG icons
├── fonts/                 # Inter font family (TTF, OTF, WOFF, WOFF2)
├── hdris/                 # Poly Haven HDRIs for 3D lighting
├── logos/                 # JV logo files (user-provided - currently empty)
└── 3d/                    # glTF 3D models
```

## How to Replace Assets

### Replacing Fonts

1. Download your preferred font (ensure license permits use)
2. Place font files in `apps/web/public/fonts/`
3. Update `apps/web/public/fonts/_font-face.css` with the new font-face declarations
4. Update your CSS/Tailwind config to reference the new font family

### Replacing Logos

1. Place logo files in `apps/web/public/logos/`
2. Recommended formats: SVG (vector) and PNG (raster, transparent background)
3. Update component references to use the new logo paths

### Replacing Gradients

1. Place gradient images in `apps/web/public/assets/hero/gradients/`
2. Recommended format: PNG (2048×1152 or higher resolution)
3. Update component references to use the new gradient paths

### Replacing 3D Models

1. Place GLB/GLTF files in `apps/web/public/3d/`
2. Ensure models are optimized (compressed textures, reasonable polygon count)
3. Update component references to use the new model paths

## Verification

- **Checksums**: See `qa/assets-shasums.txt` for SHA256 checksums of all downloaded assets
- **Failures**: See `qa/asset-failures.md` for a list of failed downloads and required actions

## License Notes

- **Inter Font**: SIL Open Font License 1.1 - Free for commercial use
- **Poly Haven HDRIs**: CC0 (Public Domain) - Free for any use
- **Khronos glTF Models**: CC0 (Public Domain) - Free for any use
- **Lucide Icons**: ISC License - Free for commercial use
- **Satoshi Font**: Fontshare license - Check license terms if manually adding
- **User-Provided Assets**: Ensure you have rights to use any user-provided logos/gradients

## Script

The asset download script is located at `scripts/fetch-assets.sh`. To re-run downloads:

```bash
chmod +x scripts/fetch-assets.sh
./scripts/fetch-assets.sh
```

## Commit Summary

This asset pack was added in commit: `chore(assets): add hero production asset pack (fonts, logos, gradients, hdris, 3d models)`

Branch: `assets/add/hero-pack`

