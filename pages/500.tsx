import type { NextPage } from 'next';

import ErrorPage from 'components/ErrorPage';


const NotFound: NextPage = () => {
  return (<ErrorPage code={500} message="Internal Server Error" />);
};


export default NotFound;
