import type { FC } from 'react';
import Head from 'next/head';

import type { HSV } from 'lib/color';
import { hsv2css } from 'lib/color';
import { makeFavicon } from 'lib/favicon';


const CommonHead: FC<{ colors?: HSV[] }> = ({ colors, children }) => {
  const colorsText = colors?.map(hsv2css)?.join('/');

  return (
    <Head>
      <title>{ colorsText ? `${colorsText} - ColorPalette` : 'ColorPalette' }</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {colors.length > 0 ? (
        <meta name="theme-color" content={hsv2css(colors[0])} />
      ) : null}
      <link rel="icon" href={makeFavicon(colors)} type="image/svg+xml" />

      { children }
    </Head>
  );
};


export default CommonHead;
