import type { HSV } from './color';
import { hsv2css, css2hsv } from './color';


export const roundNumber = (x: number, level: number = 10): number => (
  Math.round(x*level)/level
);


export const colors2url = (colors: HSV[]): string => (
  '/' + colors.map(x => hsv2css(x).slice(1)).join(',')
);


export const url2colors = (url: string): HSV[] => (
  url.trim().replace(/^\//, '').split(',').map(x => {
    try {
      return css2hsv(x);
    } catch {
      return null;
    }
  }).filter(x => x)
);
