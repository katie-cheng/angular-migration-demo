/**
 * Design tokens for the Northwind Retail design system.
 *
 * The SCSS theme is the source of truth for anything paintable; these
 * constants exist for the handful of places that need the values in
 * TypeScript (charts, canvas rendering, generated PDFs).
 */
export const BK_COLORS = {
  primary: '#003366',
  accent: '#c99a2e',
  danger: '#a3232b',
  success: '#2f855a',
  ink: '#1f2933',
  muted: '#7b8794',
  surface: '#ffffff',
  surfaceAlt: '#f5f7fa',
} as const;

export const BK_SPACING = {
  unit: 8,
  compact: 4,
  comfortable: 16,
  loose: 24,
} as const;

export const BK_BREAKPOINTS = {
  xs: 599,
  sm: 959,
  md: 1279,
  lg: 1919,
} as const;

export type BkColorToken = keyof typeof BK_COLORS;

export function bkColor(token: BkColorToken): string {
  return BK_COLORS[token];
}
