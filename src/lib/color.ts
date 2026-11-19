/**
 * Deterministic HSL color from a string (e.g. track or artist name).
 * Same saturation/lightness as the ArtistCard fallback.
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

export type Rgb = [number, number, number];

export function parseRgb(value: string): Rgb | null {
  const parts = value.match(/\d*\.?\d+/g)?.slice(0, 3).map(Number);
  if (parts?.length !== 3) return null;
  // color-mix() and friends compute to color(srgb r g b) with 0 to 1 channels
  if (value.startsWith("color(srgb")) {
    return parts.map((c) => Math.round(c * 255)) as Rgb;
  }
  return parts as Rgb;
}

/** WCAG relative luminance. */
function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Nudge a colour towards black (on light backgrounds) or white (on dark ones)
 * until it reaches the contrast ratio, keeping its hue as far as possible.
 */
export function ensureContrast(color: Rgb, background: Rgb, minRatio = 4.5): Rgb {
  const target = luminance(background) > 0.5 ? 0 : 255;
  for (let amount = 0; amount <= 1; amount += 0.05) {
    const mixed = color.map((c) => Math.round(c + (target - c) * amount)) as Rgb;
    if (contrastRatio(mixed, background) >= minRatio) return mixed;
  }
  return [target, target, target];
}

/** Parse an hsl(h, s%, l%) string, like hashStringToHsl returns, into RGB. */
export function hslToRgb(value: string): Rgb | null {
  const parts = value.match(/\d*\.?\d+/g)?.slice(0, 3).map(Number);
  if (parts?.length !== 3) return null;
  const [h, s, l] = [parts[0], parts[1] / 100, parts[2] / 100];
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((c) => Math.round(c * 255)) as Rgb;
}
