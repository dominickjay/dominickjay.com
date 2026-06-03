/**
 * Deterministic HSL color from a string (e.g. track or artist name).
 * Same saturation/lightness as MusicCard/ArtistCard fallbacks.
 */
export function hashStringToHsl(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const hue = Math.abs(hash) % 360;
  const saturation = 65;
  const lightness = 40;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Convert rgb(r, g, b) string to hsl(h, s%, l%) for consistent use with hash fallbacks.
 */
export function rgbToHsl(rgb: string): string {
  const m = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (!m) return rgb;
  const r = Number(m[1]) / 255;
  const g = Number(m[2]) / 255;
  const b = Number(m[3]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round((h / 6) * 360);
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/** Convert hsl(h, s%, l%) to hsla(h, s%, l%, alpha). Returns input unchanged if not hsl(). */
export function hslToHsla(hsl: string, alpha: number): string {
  const m = hsl.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i);
  if (!m) return hsl;
  return `hsla(${m[1]}, ${m[2]}%, ${m[3]}%, ${alpha})`;
}
