/* istanbul ignore file */
import { extractCritical } from 'emotion-server';
import Document, { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import getConfig from 'next/config';

import '~/globalStyles';

type Props = DocumentProps & {
  css: any;
};

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }:any) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  props: Props;

  constructor(props:any) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  loadCircleciConfigurationJavascript = (
    hostname: any,
    exceptionLoggerClientToken: string,
    analyticsKey: string,
    isEnterprise = false,
  ) => {
    const config = {
      hostname,
      isEnterprise,
      exceptionLoggerClientToken,
      analyticsKey,
    };
    return `var circleci = {config: ${JSON.stringify(config)}};`;
  };
  render() {
    const { publicRuntimeConfig } = getConfig();
    const {
      hostname,
      isEnterprise,
      exceptionLoggerClientToken,
      analyticsKey,
    } = publicRuntimeConfig;
    return (
      <Html lang="en-US">
        <Head>
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: this.loadCircleciConfigurationJavascript(
                hostname,
                exceptionLoggerClientToken,
                analyticsKey,
                isEnterprise,
              ),
            }}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#04aa51"
          />
          <meta name="msapplication-TileColor" content="#603cba" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
