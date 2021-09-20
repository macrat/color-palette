import type { FC } from 'react';
import { useState } from 'react';

import { HSV } from 'lib/color';
import { hsv2css, uiColor } from 'lib/color';
import Picker from 'components/Picker';
import Sample from 'components/Sample';


const ColorPane: FC<{
  color: HSV,
  setColor: (x: HSV) => void,
  otherColors: HSV[],
  onShuffle: () => void,
  onClose: () => void,
}> = ({ color, setColor, otherColors, onShuffle, onClose }) => {
  return (
    <>
      <div>
        <button onClick={onShuffle} title="re-roll this color"><svg focusable="false" aria-label="re-roll" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z" /></svg></button>
        <button onClick={onClose} title="close this column"><svg focusable="false" aria-label="close" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M 344.61029,256 477.51245,123.09784 c 16.30896,-16.30897 16.30896,-42.751276 0,-59.073526 L 447.97568,34.48755 c -16.30897,-16.308968 -42.75128,-16.308968 -59.07353,0 L 256,167.38971 123.09784,34.48755 c -16.30897,-16.308968 -42.751276,-16.308968 -59.073526,0 L 34.48755,64.024314 c -16.308968,16.308969 -16.308968,42.751276 0,59.073526 L 167.38971,256 34.48755,388.90215 c -16.308968,16.30897 -16.308968,42.75128 0,59.07353 l 29.536764,29.53677 c 16.308969,16.30896 42.764556,16.30896 59.073526,0 L 256,344.61029 388.90215,477.51245 c 16.30897,16.30896 42.76456,16.30896 59.07353,0 l 29.53677,-29.53677 c 16.30896,-16.30897 16.30896,-42.75128 0,-59.07353 z" /></svg></button>
      </div>
      <Picker color={color} setColor={setColor} />
      <Sample color={color} otherColors={otherColors} />

      <style jsx>{`
        div {
          position: absolute;
          top: .5em;
          right: .2em;
        }
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
        svg {
          width: 1.8em;
          height: 1.8em;
        }
        path {
          fill: ${ hsv2css(uiColor(color, 3)) }
        }
      `}</style>
    </>
  );
}


export default ColorPane;
