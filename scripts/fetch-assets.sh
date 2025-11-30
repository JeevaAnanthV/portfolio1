#!/usr/bin/env bash
set -euo pipefail

DL_OPTS="-fSL --retry 5 --retry-delay 2 --retry-max-time 60"

save() {
  url="$1"
  out="$2"
  echo "Downloading $url -> $out"
  mkdir -p "$(dirname "$out")"
  if ! curl $DL_OPTS "$url" -o "$out"; then
    echo "ERROR: failed to download $url" >&2
    return 1
  fi
  # basic sanity: file non-empty
  if [ ! -s "$out" ]; then
    echo "ERROR: $out is empty" >&2
    return 2
  fi
}

# Fonts: Satoshi primary (fontshare)
# Try to download a zip or ttf; fontshare may redirect to assets - attempt direct fetch
SatoshiUrlCandidates=(
  "https://api.fontshare.com/static/fonts/satoshi.zip"
  "https://fontshare.com/download/satoshi" # attempt generic
)
# Try primary user assets first if provided (none)
for u in "${SatoshiUrlCandidates[@]}"; do
  if curl -s --head $DL_OPTS "$u" | head -n 1 | grep -q "200"; then
    echo "Found Satoshi candidate: $u"
    save "$u" "apps/web/public/fonts/satoshi.zip" && unzip -o apps/web/public/fonts/satoshi.zip -d apps/web/public/fonts && break
  fi
done

# Fallback: Inter (Google Fonts)
save "https://github.com/rsms/inter/releases/download/v3.19/Inter-3.19.zip" "apps/web/public/fonts/inter.zip" || true
if [ -s apps/web/public/fonts/inter.zip ]; then
  unzip -o apps/web/public/fonts/inter.zip -d apps/web/public/fonts || true
fi

# User-provided JV logo files (catbox links)
save "https://files.catbox.moe/4fmm3t.png" "apps/web/public/logos/jv-logo.png" || true
save "https://files.catbox.moe/sq2h7h.svg" "apps/web/public/logos/jv-logo.svg" || true

# User-provided gradients
save "https://files.catbox.moe/v2txnb.png" "apps/web/public/assets/hero/gradients/dark-metal.png" || true
save "https://files.catbox.moe/0izsz5.png" "apps/web/public/assets/hero/gradients/purple-space.png" || true

# Download Polyhaven HDRIs (1k studio candidates)
HDRIS=(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr"
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_04_1k.hdr"
)
for h in "${HDRIS[@]}"; do
  save "$h" "apps/web/public/hdris/$(basename $h)" || echo "HDRI $h failed, continuing"
done

# Khronos glTF sample models
save "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb" "apps/web/public/3d/damaged_helmet.glb" || true
save "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Avocado/glTF-Binary/Avocado.glb" "apps/web/public/3d/avocado.glb" || true

# Icons: pull lucide svg set single-file list (example of arrow/menu/close)
ICON_BASE="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons"
ICONS=(arrow-right menu x search)
for ic in "${ICONS[@]}"; do
  save "$ICON_BASE/$ic.svg" "apps/web/public/assets/icons/$ic.svg" || echo "icon $ic failed"
done

echo "Download script completed."

