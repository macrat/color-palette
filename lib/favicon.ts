import type { HSV } from './color';
import { hsv2css } from './color';


export const makeLayout = (n: number): number[] => {
  let h = 1;
  for (let thresh = 3; n > thresh; thresh = thresh * 2 + 1) {
    h++;
  }

  const rows = [...new Array(Math.floor(h))].map(() => 0);

  for (let i = 0; i < n; i++) {
    rows[i % h]++;
  }

  return rows;
};


export interface Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
};


export const makePositions = (layout: number[]): Rectangle[] => {
  const results: Rectangle[] = [];

  const total = layout.reduce((x, xs) => xs + x);

  let y = 0;
  let x = 0;

  for (let i = 0; i < total; i++) {
    if (x >= layout[y]) {
      x = 0;
      y++;
    }

    results.push({
      x: x / layout[y],
      y: y / layout.length,
      w: 1 / layout[y],
      h: 1 / layout.length,
    });

    x++;
  }

  return results;
};


export interface MakeSVGOptions {
  round?: number;
  width?: number;
  height?: number;
}


export const makeSVG = (colors: HSV[], { round = 0.2, width = 512, height = 512 }: MakeSVGOptions = {}) => {
  const pos = makePositions(makeLayout(colors.length));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="${width}" height="${height}" preserveAspectRatio="none"><defs><clipPath id="clip-circle"><rect width="1" height="1" rx="${round}" /></clipPath></defs>${ colors.map((x, i) => (
    `<rect x="${pos[i].x}" y="${pos[i].y}" width="${pos[i].w}" height="${pos[i].h}" fill="${hsv2css(x)}" clip-path="url(#clip-circle)" />`
  )).join('') }</svg>`;
};


export const makeFavicon = (colors: HSV[]) => {
  return 'data:image/svg+xml;base64,' + new Buffer(makeSVG(colors), 'ascii').toString('base64');
};
