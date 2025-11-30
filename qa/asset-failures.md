# Asset Download Failures

This document lists assets that failed to download and any fallbacks used.

## Failed Downloads

### User-Provided Assets (404 Errors)
The following user-provided assets returned 404 errors and could not be downloaded:

1. **JV Logo (PNG)**: `https://files.catbox.moe/4fmm3t.png`
   - Status: 404 Not Found
   - Expected location: `public/logos/jv-logo.png`
   - Action: User needs to re-upload or provide alternative URL

2. **JV Logo (SVG)**: `https://files.catbox.moe/sq2h7h.svg`
   - Status: 404 Not Found
   - Expected location: `public/logos/jv-logo.svg`
   - Action: User needs to re-upload or provide alternative URL

3. **Dark Metal Gradient**: `https://files.catbox.moe/v2txnb.png`
   - Status: 404 Not Found
   - Expected location: `public/assets/hero/gradients/dark-metal.png`
   - Action: User needs to re-upload or provide alternative URL

4. **Purple Space Gradient**: `https://files.catbox.moe/0izsz5.png`
   - Status: 404 Not Found
   - Expected location: `public/assets/hero/gradients/purple-space.png`
   - Action: User needs to re-upload or provide alternative URL

### Font Downloads

1. **Satoshi Font (Primary)**: 
   - Attempted URLs:
     - `https://api.fontshare.com/static/fonts/satoshi.zip` (400 Bad Request)
     - `https://fontshare.com/download/satoshi` (returned HTML, not zip)
   - Status: Failed - Fontshare requires manual download or authentication
   - Fallback: Inter font (SIL Open Font License) successfully downloaded
   - Action: Using Inter as primary font. Satoshi can be manually added if license permits.

### 3D Models (Initial Attempt)

1. **DamagedHelmet.glb** (Initial URL):
   - URL: `https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb`
   - Status: 404 Not Found (incorrect path)
   - Resolution: Successfully downloaded using alternative URL: `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb`

2. **Avocado.glb** (Initial URL):
   - URL: `https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Avocado/glTF-Binary/Avocado.glb`
   - Status: 404 Not Found (incorrect path)
   - Resolution: Successfully downloaded using alternative URL: `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb`

## Successfully Downloaded Assets

- ✅ Inter font family (40 TTF/OTF files)
- ✅ 2 HDRIs from Poly Haven (studio_small_04_1k.hdr, studio_small_08_1k.hdr)
- ✅ 2 3D models (damaged_helmet.glb, avocado.glb)
- ✅ 4 Lucide icons (arrow-right, menu, x, search)

