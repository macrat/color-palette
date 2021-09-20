import type { FC } from 'react';

import { roundNumber } from 'lib/util';
import type { HSV } from 'lib/color';
import { hsv2css, uiColor, contrastRatio, contrastTest } from 'lib/color';


const ContrastTestPanel: FC<{ background: HSV, foreground: HSV, label: string, result: 'AA' | 'AAA' | 'PASS' | 'FAIL' }> = ({ background, foreground, label, result }) => {
  return (
    <div className={'contrast-' + result.toLowerCase()}>
      <span className="primary">{label}: {result}</span>
      <span className="secondary" aria-hidden="true">{label}: {result}</span>

      <style jsx>{`
        div {
          position: relative;
          margin: .2em;
        }
        span {
          display: block;
          padding: .2em .5em;
          border: 1px solid ${ hsv2css(foreground) };
        }
        .contrast-aaa, .contrast-pass {
          background-color: ${ hsv2css(foreground) };
          color: ${ hsv2css(background) };
        }
        .secondary {
          position: absolute;
          top: 0;
          left: 0;
          clip-path: polygon(100% 100%, 100% 0, 0 100%);
          background-color: ${ hsv2css(foreground) };
          color: ${ hsv2css(background) };
          display: none;
          user-select: none;
        }
        .contrast-aa .secondary {
          display: block;
        }

        ::selection {
          color: ${ hsv2css(uiColor(foreground)) };
          background-color: ${ hsv2css(foreground) };
        }
        .contrast-aaa :global(::selection), .contrast-pass :global(::selection) {
          color: ${ hsv2css(foreground) };
          background-color: ${ hsv2css(background) };
        }
      `}</style>
    </div>
  );
}

const ContrastTestIndicator: FC<{ background: HSV, foreground: HSV }> = ({ background, foreground }) => {
  const ratio = contrastRatio(background, foreground);
  const result = contrastTest(ratio);

  return (
    <div>
      <span>contrast: { roundNumber(ratio, 100) }:1</span>
      <ul>
        <li><ContrastTestPanel background={background} foreground={foreground} result={result.Large} label="Large" /></li>
        <li><ContrastTestPanel background={background} foreground={foreground} result={result.Normal} label="Normal" /></li>
        <li><ContrastTestPanel background={background} foreground={foreground} result={result.NonText} label="NonText" /></li>
      </ul>

      <style jsx>{`
        span {
          font-size: 150%;
        }
        ul {
          display: block;
          padding: 0;
          margin: 0 -.2em;
        }
        li {
          display: inline-block;
        }
        ::selection {
          color: ${ hsv2css(uiColor(foreground)) };
          background-color: ${ hsv2css(foreground) };
        }
      `}</style>
    </div>
  );
};


const TextLine: FC<{ background: HSV; foreground: HSV }> = ({ background, foreground }) => {
  return (
    <li>
      <div>
        <span style={{ fontSize: '400%' }}>Aa</span>
        <span style={{ fontSize: '200%' }}> { hsv2css(foreground) }</span>
      </div>

      <ContrastTestIndicator background={background} foreground={foreground} />

      <style jsx>{`
        div::after {
          content: '';
          display: block;
          height: .5em;
          background-color: ${ hsv2css(foreground) };
        }
        li {
          color: ${ hsv2css(foreground) };
          display: block;
        }
        ::selection {
          color: ${ hsv2css(uiColor(foreground)) };
          background-color: ${ hsv2css(foreground) };
        }
      `}</style>
    </li>
  );
};


const Sample: FC<{ color: HSV; otherColors: HSV[] }> = ({ color, otherColors }) => {
  return (
    <ul>
      {otherColors.map((c, i) => (<TextLine key={i} background={color} foreground={c} />))}

      <style jsx>{`
        ul {
          display: block;
          background-color: ${ hsv2css(color) };
          margin: 0;
          padding: 0 2em 2em;
        }
      `}</style>
    </ul>
  );
}

export default Sample;
