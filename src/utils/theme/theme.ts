import { Theme, ThemeInput } from "../../types";
import { getContext } from "../context";
import { DefaultTheme } from "./defaultTheme";

export default function getTheme(): Theme {
  const { theme: contextTheme } = getContext();

  const themeInput = contextTheme || DefaultTheme;

  const hydrated = hydrateTheme(themeInput);

  hydrated.default = hydrateTheme(DefaultTheme);

  return hydrated;
}

const needLightAndDarkTheme = [
  "primary",
  "danger",
  "success",
  "warning",
  "info",
];
function hydrateTheme(theme: ThemeInput): Theme {
  theme = { ...DefaultTheme, ...theme };

  for (const needs of needLightAndDarkTheme) {
    theme[needs + "Light"] = makeHexLighter(theme[needs]);
    theme[needs + "Dark"] = makeHexDarker(theme[needs]);
  }

  const outTheme = {
    ...theme,
    white: "#FFFFFF",
    black: "#000000",
    ghost: "#2b2d31",
  };

  return outTheme as Theme;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

function adjustBrightness(hex: string, factor: number): string {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.max(0, Math.min(255, r + factor));
  const newG = Math.max(0, Math.min(255, g + factor));
  const newB = Math.max(0, Math.min(255, b + factor));
  return rgbToHex(newR, newG, newB);
}

function makeHexDarker(hex: string, amount: number = 20): string {
  return adjustBrightness(hex, -amount);
}

function makeHexLighter(hex: string, amount: number = 20): string {
  return adjustBrightness(hex, amount);
}
