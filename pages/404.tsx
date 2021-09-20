import type { NextPage } from 'next';

import ErrorPage from 'components/ErrorPage';


const NotFound: NextPage = () => {
  return (<ErrorPage code={404} message="Not Found" />);
};


export default NotFound;
