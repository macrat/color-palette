import type { NextPage, GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { hsv2css } from 'lib/color';
import { colors2url } from 'lib/util';
import Head from 'components/Head';


const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.replace(colors2url([
        { h: Math.round(Math.random()*360), s: 50, v:  50 },
        { h: Math.round(Math.random()*360), s: 50, v:  75 },
        { h: Math.round(Math.random()*360), s: 50, v: 100 },
      ]));
    }
  }, [router]);

  return (
    <span>
      <Head />
      loading...
    </span>
  );
};


export const getServerSideProps: GetServerSideProps = async () => {
  const url = colors2url([
    { h: Math.round(Math.random()*360), s: 50, v:  50 },
    { h: Math.round(Math.random()*360), s: 50, v:  75 },
    { h: Math.round(Math.random()*360), s: 50, v: 100 },
  ]);

  return {
    redirect: {
      permanent: false,
      destination: url,
    },
  };
}


export default Index;
