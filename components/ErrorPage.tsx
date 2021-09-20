import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Head from 'components/Head';
import type { HSV } from 'lib/color';
import { hsv2css, uiColor } from 'lib/color';


const ErrorPage: FC<{ code: number; message: string }> = ({ code, message }) => {
  const [color, setColor] = useState<HSV>({ h: 0, s: 0, v: 0 });

  useEffect(() => {
    setColor({
      h: Math.random()*360,
      s: 50,
      v: 80,
    });
  }, []);

  return (
    <div>
      <Head colors={[color, uiColor(color, 3)]} />

      <span>{ code }</span>
      <h1>{ message }</h1>
      <Link href="/"><a>go to palette</a></Link>

      <style jsx>{`
        :global(body) {
          margin: 0;
          background-color: ${hsv2css(color)};
        }
        div {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        span {
          display: block;
          font-size: 800%;
          color: ${hsv2css(uiColor(color, 3))};
        }
        h1 {
          margin: -.8em 0 0;
          font-size: 300%;
          color: ${hsv2css(uiColor(color, 5))};
        }
        a {
          color: ${hsv2css(uiColor(color, 7))};
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
