import type { HSV } from './color';
import { hsv2css, css2hsv, contrastRatio, uiColor } from './color';


describe('convert', () => {
  const tests = [
    ['#ff1971', { h: 337.04, s:  90.20, v: 100.00 }],
    ['#539120', { h:  92.92, s:  77.93, v:  56.86 }],
    ['#324fd1', { h: 229.06, s:  76.08, v:  81.96 }],
    ['#dbdbdb', { h:   0.00, s:   0.00, v:  85.88 }],
    ['#ffffff', { h:   0.00, s:   0.00, v: 100.00 }],
  ];

  describe('css to hsv', () => {
    test.each(tests)('%s', (css: string, hsv: HSV) => {
      const { h, s, v } = css2hsv(css);
      expect(h).toBeCloseTo(hsv.h);
      expect(s).toBeCloseTo(hsv.s);
      expect(v).toBeCloseTo(hsv.v);
    });

    test('invalid color', () => {
      expect(() => {
        css2hsv('invalid-color');
      }).toThrow('invalid-color is invalid as a color');

      expect(() => {
        css2hsv('12345');
      }).toThrow('12345 is invalid as a color');

      expect(() => {
        css2hsv('1234567');
      }).toThrow('1234567 is invalid as a color');
    });
  });

  describe('hsv to css', () => {
    test.each(tests)('%s', (css: string, hsv: HSV) => {
      expect(hsv2css(hsv)).toStrictEqual(css);
    });
  });
});


describe('contrast ratio', () => {
  const tests = [
    ['#ecf2e4', '#03917d', 3.44],
    ['#ffd7d7', '#dcde05', 1.10],
    ['#f9fadc', '#980454', 7.96],
  ];

  test.each(tests)('%s vs %s', (a: string, b: string, ratio: number) => {
    expect(contrastRatio(css2hsv(a), css2hsv(b))).toBeCloseTo(ratio);
  });
});


describe('generate UI color', () => {
  const tests = [
    ['#ecf2e4', '#2d4f00'], // http://localhost:3000/ecf2e4,2d4f00
    ['#d21cef', '#000000'], // http://localhost:3000/d21cef,000000
    ['#dff354', '#3e4700'], // http://localhost:3000/dff354,3e4700
    ['#f562a5', '#000000'], // http://localhost:3000/f562a5,000000
    ['#61fff7', '#004d49'], // http://localhost:3000/61fff7,004d49
    ['#ffd9cf', '#7a1900'], // http://localhost:3000/ffd9cf,7a1900
    ['#7a1b00', '#ffd9cf'], // http://localhost:3000/7a1b00,ffd9cf
    ['#053600', '#15e600'], // http://localhost:3000/053600,15e600
  ];

  test.each(tests)('%s', (accent: string, ui: string) => {
    expect(hsv2css(uiColor(css2hsv(accent)))).toBe(ui);
  });
});
