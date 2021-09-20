import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { roundNumber } from 'lib/util';
import type { HSV } from 'lib/color';
import { hsv2css, css2hsv, uiColor } from 'lib/color';


const ColorInput: FC<{ color: HSV, setColor: (c: HSV) => void, selectColor: HSV }> = ({ color, setColor, selectColor }) => {
  const [value, setValue] = useState<string>(hsv2css(color).slice(1));

  useEffect(() => {
    const newval = hsv2css(color).slice(1);

    // ignore rounding error
    if (hsv2css(css2hsv(value)).slice(1) === newval) {
      return;
    }

    setValue(newval);

    // Don't have to care about change of `value` because it's the function to copy from `color` to `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <div>
      <span>#</span>
      <input
        type="text"
        pattern="[0-9a-fA-F]{6}"
        value={value}
        onChange={(ev) => {
          const x = ev.target.value.trim().replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
          setValue(x);

          if (x.length == 6) {
            try {
              setColor(css2hsv(x));
            } catch {}
          }
        }}
      />
      <style jsx>{`
        div {
          display: flex;
          background-color: transparent;
          font-size: 200%;
          width: 100%;
        }
        input {
          flex: 1 1 0;
          width: 0;
          font-size: inherit;
          font-family: inherit;
          background-color: transparent;
          color: inherit;
          border: none;
        }

        ::selection {
          background-color: ${ hsv2css(selectColor) };
          color: ${ hsv2css(color) };
        }
      `}</style>
    </div>
  );
}


const Picker: FC<{ color: HSV, setColor: (c: HSV) => void }> = ({ color, setColor}) => {
  const color2 = uiColor(color);
  const color3 = uiColor(color, 3.0);

  return (
    <div>
      <ColorInput color={color} setColor={setColor} selectColor={color2} />

      <label>
        Hue: {roundNumber(color.h)}
        <input
          className="range-h"
          type="range"
          min={0}
          max={360}
          step={1}
          value={color.h}
          onChange={(ev) => setColor({ ...color, h: Number(ev.target.value) })}
        />
      </label>
      <label>
        Saturation: {roundNumber(color.s)}%
        <input
          className="range-s"
          type="range"
          min={0}
          max={100}
          step={1}
          value={color.s}
          onChange={(ev) => setColor({ ...color, s: Number(ev.target.value) })}
        />
      </label>
      <label>
        Brightness: {roundNumber(color.v)}%
        <input
          className="range-v"
          type="range"
          min={0}
          max={100}
          step={1}
          value={color.v}
          onChange={(ev) => setColor({ ...color, v: Number(ev.target.value) })}
        />
      </label>

      <style jsx>{`
        div {
          background-color: ${ hsv2css(color) };
          color: ${ hsv2css(color2) };
          padding: 2em;
        }
        input {
          display: block
        }
        input[type='range'] {
          appearance: none;
          background-color: transparent;
          height: 2em;
          width: 100%;
        }
        input[type='range']::-webkit-slider-runnable-track {
          appearance: none;
          height: 2px;
        }
        input[type='range']::-moz-range-track {
          appearance: none;
          height: 2px;
        }
        .range-h::-webkit-slider-runnable-track {
          background: linear-gradient(to right, ${ [...new Array(36)].map((_, i) => hsv2css({ h: i*10, s: 100, v: 100 })).join(",") });
        }
        .range-h::-moz-range-track {
          background: linear-gradient(to right, ${ [...new Array(36)].map((_, i) => hsv2css({ h: i*10, s: 100, v: 100 })).join(",") });
        }
        .range-s::-webkit-slider-runnable-track {
          background: linear-gradient(to right, gray, ${ hsv2css({ h: color.h, s: 100, v: 100 }) });
        }
        .range-s::-moz-range-track {
          background: linear-gradient(to right, gray, ${ hsv2css({ h: color.h, s: 100, v: 100 }) });
        }
        .range-v::-webkit-slider-runnable-track {
          background: linear-gradient(to right, black, white);
        }
        .range-v::-moz-range-track {
          background: linear-gradient(to right, black, white);
        }
        input[type='range']::-webkit-slider-thumb {
          background-color: ${ hsv2css(color3) };
          appearance: none;
          position: relative;
          top: -.75em;
          width: 1.5em;
          height: 1.5em;
          border-radius: 1.5em;
          cursor: ew-resize;
        }
        input[type='range']::-moz-range-thumb {
          background-color: ${ hsv2css(color3) };
          appearance: none;
          position: relative;
          top: -.75em;
          width: 1.5em;
          height: 1.5em;
          border: none;
          border-radius: 1.5em;
          cursor: ew-resize;
        }

        ::selection {
          background-color: ${ hsv2css(color2) };
          color: ${ hsv2css(color) };
        }
      `}</style>
    </div>
  );
}


export default Picker;
