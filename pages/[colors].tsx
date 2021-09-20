import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import type { HSV } from 'lib/color';
import { hsv2css } from 'lib/color';
import { colors2url, url2colors } from 'lib/util';
import Head from 'components/Head';
import ColorPane from 'components/ColorPane';
import ToolPane from 'components/ToolPane';


const ColorPage: NextPage<{ initialColors: HSV[] }> = ({ initialColors }) => {
  const [colors, setColors] = useState<HSV[]>(initialColors);

  const router = useRouter();

  const [urlColors] = useDebounce(colors, 100);
  useEffect(() => {
    router.replace(colors2url(urlColors), null, { scroll: false, shallow: true });

    // Don't care about router's update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlColors]);

  useEffect(() => {
    if (initialColors.length === 0) {
      router.replace('/', null, { scroll: false });
    }

    router.beforePopState(({ as: url }) => {
      setColors(url2colors(url));
      return false;
    });

    // Run this effect only once when page loaded (don't follow any changes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setColors(initialColors);
  }, [initialColors]);

  const makeRandomColor = () => ({
    h: Math.round(Math.random()*360),
    s: Math.round(Math.random()*60)+30,
    v: Math.round(Math.random()*75)+25,
  });

  return (
    <div>
      <ul>
        <Head colors={colors} />

        {colors.map((c, i) => (
          <li key={i} style={{ backgroundColor: hsv2css(c) }}>
            <ColorPane
              color={c}
              setColor={(x: HSV) => {
                const cs = [...colors];
                cs[i] = x;
                setColors(cs);
              }}
              otherColors={[...colors.slice(0, i), ...colors.slice(i+1)]}
              onShuffle={() => {
                setColors([...colors.slice(0, i), makeRandomColor(), ...colors.slice(i+1)]);
              }}
              onClose={() => {
                const cs = [...colors.slice(0, i), ...colors.slice(i+1)];
                setColors(cs);
                router.push(colors2url(cs), null, { scroll: false });
              }}
            />
          </li>
        ))}

        <li className="tool-pane">
          <ToolPane
            onAppend={() => {
              setColors([
                ...colors,
                makeRandomColor(),
              ]);
              setTimeout(() => {
                  window.scrollBy(window.innerWidth, 0);
              }, 10);
            }}
            onShuffle={() => {
              const cs = [];
              for (let i = 0; i < colors.length; i++) {
                cs.push(makeRandomColor());
              }
              setColors(cs);
              router.push(colors2url(cs), null, { scroll: false });
            }}
          />
        </li>
      </ul>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        div {
          height: max-content;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: max-content;
          min-width: 100vw;
        }
        ul {
          flex: 1 1 0;
          display: flex;
          width: 100vw;
          margin: 0;
          padding: 0;
        }
        li {
          flex: 1 0 20em;
          display: block;
          padding: 0;
          position: relative;
        }
        .tool-pane {
          flex: 0 0 4rem;
        }
      `}</style>
    </div>
  );
};


ColorPage.getInitialProps = ({ query: { colors } }) => {
  return {
    initialColors: url2colors(String(colors)),
  };
};


export default ColorPage;
