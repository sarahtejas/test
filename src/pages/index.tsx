import React from 'react';
import Head from 'next/head';

import Hello from '~/components/Hello';

const Home = () => (
  <div data-cy="hello-world">
    <Head>
      <title>Home</title>
    </Head>

    <Hello />
  </div>
);

export default Home;
