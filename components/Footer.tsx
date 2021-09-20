import type { FC } from 'react';


const Footer: FC = () => {
  return (
    <footer>
      MIT License (c)2021- <a href="https://blanktar.jp">MacRat</a>
      <a href="https://github.com/macrat/color-palette" className="github">Fork on GitHub</a>
      <style jsx>{`
        footer {
          width: 100%;
          background-color: #b6b6b6;
          color: #474747;
          padding: .1em 1em;
          text-align: center;
          font-size: 80%;
        }
        a {
          color: inherit;
        }
        .github::before {
          content: '|';
          display: inline-block;
          margin: 0 1em;
        }
      `}</style>
    </footer>
  );
};


export default Footer;
