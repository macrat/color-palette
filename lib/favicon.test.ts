import type { Rectangle } from './favicon';
import { makeLayout, makePositions } from './favicon';


describe('makeLayout', () => {
  const tests = [
    [1, [1]],
    [2, [2]],
    [3, [3]],
    [4, [2, 2]],
    [5, [3, 2]],
    [6, [3, 3]],
    [7, [4, 3]],
    [8, [3, 3, 2]],
    [9, [3, 3, 3]],
    [12, [4, 4, 4]],
    [13, [5, 4, 4]],
  ];

  test.each(tests)('%d', (n: number, layout: number[]) => {
    expect(makeLayout(n)).toStrictEqual(layout);
  });
});


describe('makePositions', () => {
  const tests = [
    [[2, 1], [
      { x: 0.0, y: 0.0, w: 0.5, h: 0.5 },
      { x: 0.5, y: 0.0, w: 0.5, h: 0.5 },
      { x: 0.0, y: 0.5, w: 1.0, h: 0.5 },
    ]],
    [[4, 2, 4, 1], [
      { x: 0.00, y: 0.00, w: 0.25, h: 0.25 },
      { x: 0.25, y: 0.00, w: 0.25, h: 0.25 },
      { x: 0.50, y: 0.00, w: 0.25, h: 0.25 },
      { x: 0.75, y: 0.00, w: 0.25, h: 0.25 },
      { x: 0.00, y: 0.25, w: 0.50, h: 0.25 },
      { x: 0.50, y: 0.25, w: 0.50, h: 0.25 },
      { x: 0.00, y: 0.50, w: 0.25, h: 0.25 },
      { x: 0.25, y: 0.50, w: 0.25, h: 0.25 },
      { x: 0.50, y: 0.50, w: 0.25, h: 0.25 },
      { x: 0.75, y: 0.50, w: 0.25, h: 0.25 },
      { x: 0.00, y: 0.75, w: 1.00, h: 0.25 },
    ]],
  ];

  test.each(tests)('%s', (layout: number[], positions: Rectangle[]) => {
    expect(makePositions(layout)).toStrictEqual(positions);
  });
});
