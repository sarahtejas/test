import { CompassThemeProvider } from '@circleci/compass';
import theme from '@circleci/theme';
import { ThemeProvider } from 'emotion-theming';
import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import '~/backplane/makeExceptionLogger';

interface Props extends AppProps {
  ctx: NextPageContext;
}

const WebUI = ({ Component, pageProps, router }: AppProps) => (
  <>
    <Head>
      <title>CircleCI</title>
    </Head>
    <CompassThemeProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} router={router} />
      </ThemeProvider>
    </CompassThemeProvider>
  </>
);

/* IMPORTANT: getInitialProps is required for Server Side Rendering in nextjs.
 * We use this on CircleCI Enterprise to pass environment variables
 * from the pod through nextjs server and seed window.circleci.config
 * in the browser.
 * If your web-ui* app is not part of CircleCI Enterprise, you will still need \
 * this to set the runtime configuration of api fetches, exception logging, and
 * analytics among other things.
 */
WebUI.getInitialProps = async ({ Component, ctx }: Props) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default WebUI;
