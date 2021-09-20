import type { HSV } from './color';
import { roundNumber, colors2url, url2colors } from './util';


describe('roundNumber', () => {
  test.each([
    [12.345, 1, 12],
    [12.345, 10, 12.3],
    [12.345, 100, 12.35],
  ])('%f*%d', (x: number, level: number, result: number) => {
    expect(roundNumber(x, level)).toBeCloseTo(result);
  });
});


describe('colorand url', () => {
  const tests = [
    [
      '/ffffff,ff8080,ff0000',
      [{ h: 0, s: 0, v: 100 }, { h: 0, s: 49.8, v: 100}, { h: 0, s: 100, v: 100 }],
    ],
    [
      '/ffffff,ff8080',
      [{ h: 0, s: 0, v: 100 }, { h: 0, s: 49.8, v: 100}],
    ],
  ];

  describe('colors2url', () => {
    test.each(tests)('%s', (url: string, colors: HSV[]) => {
      expect(colors2url(colors)).toBe(url);
    });
  });

  describe('url2colors', () => {
    test.each(tests)('%s', (url: string, colors: HSV[]) => {
      const result = url2colors(url);

      expect(result.length).toBe(colors.length);

      for (let i = 0; i < Math.min(result.length, colors.length); i++) {
        expect(result[i].h).toBeCloseTo(colors[i].h);
        expect(result[i].s).toBeCloseTo(colors[i].s);
        expect(result[i].v).toBeCloseTo(colors[i].v);
      }
    });
  });
});
