import convert from 'color-convert';
import { ContrastChecker } from 'color-contrast-calc';


export interface HSV {
  h: number;
  s: number;
  v: number;
}


interface RGB {
  r: number;
  g: number;
  b: number;
}


function hex2rgb(hex: string): RGB {
  const [r, g, b] = convert.hex.rgb(hex);
  return { r, g, b };
}


function rgb2hex(rgb: RGB): string {
  return convert.rgb.hex(rgb.r, rgb.g, rgb.b).toLowerCase();
}


function rgb2hsv(rgb: RGB): HSV {
  const [r, g, b] = [rgb.r/255, rgb.g/255, rgb.b/255];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const hsv = {
    h: 0,
    s: (max - min) / max * 100,
    v: max * 100,
  };

  if (min == max) {
    return hsv;
  }

  switch(min) {
    case b:
      hsv.h = 60 * (g - r) / (max - min) + 60;
      break;
    case r:
      hsv.h = 60 * (b - g) / (max - min) + 180;
      break;
    case g:
      hsv.h = 60 * (r - b) / (max - min) + 300;
      break;
  }

  return hsv;
}


function hsv2rgb(hsv: HSV): RGB {
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  const h2 = hsv.h % 360 / 60;
  const f = h2 - Math.floor(h2);

  const rgb = {
    r: v,
    g: v,
    b: v,
  };

  switch (Math.floor(h2)) {
  case 0:
    rgb.g *= 1 - s * (1 - f);
    rgb.b *= 1 - s;
    break;
  case 1:
    rgb.r *= 1 - s * f;
    rgb.b *= 1 - s;
    break;
  case 2:
    rgb.r *= 1 - s;
    rgb.b *= 1 - s * (1 - f);
    break;
  case 3:
    rgb.r *= 1 - s;
    rgb.g *= 1 - s * f;
    break;
  case 4:
    rgb.r *= 1 - s * (1 - f);
    rgb.g *= 1 - s;
    break;
  case 5:
    rgb.g *= 1 - s;
    rgb.b *= 1 - s * f;
    break;
  }

  rgb.r *= 255;
  rgb.g *= 255;
  rgb.b *= 255;

  return rgb;
}


export function hsv2css(hsv: HSV): string {
  return '#' + rgb2hex(hsv2rgb(hsv));
}


export function css2hsv(css: string): HSV {
  if (css.startsWith('#')) {
    css = css.slice(1)
  }
  if (!css.match(/^[0-9a-fA-F]{6}$/)) {
    throw new Error(`${css} is invalid as a color code`);
  }
  return rgb2hsv(hex2rgb(css));
}


function rgb2array({ r, g, b }: RGB): number[] {
  return [r, g, b];
}


export function contrastRatio(a: HSV, b: HSV): number {
  return ContrastChecker.contrastRatio(rgb2array(hsv2rgb(a)), rgb2array(hsv2rgb(b)));
}


export interface ContrastTestResult {
  Large: 'AAA' | 'AA' | 'FAIL';
  Normal: 'AAA' | 'AA' | 'FAIL';
  NonText: 'PASS' | 'FAIL',
}


export function contrastTest(ratio: number): ContrastTestResult {
  return {
    Large: ratio >= 4.5 ? 'AAA' : (ratio >= 3.0 ? 'AA' : 'FAIL'),
    Normal: ratio >= 7.0 ? 'AAA' : (ratio >= 4.5 ? 'AA' : 'FAIL'),
    NonText: ratio > 3.0 ? 'PASS' : 'FAIL',
  };
}


export function uiColor(otherColor: HSV, target: number = 8.0): HSV {
  const black = { h: otherColor.h, s: 100, v: 0 };
  const blackContrast = contrastRatio(otherColor, black);
  const white = { h: otherColor.h, s: 0, v: 100 };
  const whiteContrast = contrastRatio(otherColor, white);

  if (blackContrast >= whiteContrast) {
    if (blackContrast <= target) {
      return black;
    }
    for (; black.v < 100; black.v++) {
      if (contrastRatio(otherColor, black) < target) {
        black.v--;
        break;
      }
    }
    for (; black.s < 100; black.s++) {
      if (contrastRatio(otherColor, black) < target) {
        black.s--;
        break;
      }
    }
    return black;
  }

  if (whiteContrast <= target) {
    return white;
  }
  for (; white.s < 100; white.s++) {
    if (contrastRatio(otherColor, white) < target) {
      white.s--;
      break;
    }
  }
  for (; white.v > 0; white.v--) {
    if (contrastRatio(otherColor, white) < target) {
      white.v++;
      break;
    }
  }
  return white;
}


export function makeRandomColor(): HSV {
  return {
    h: Math.round(Math.random()*360),
    s: Math.round(Math.random()*60)+30,
    v: Math.round(Math.random()*75)+25,
  };
}
