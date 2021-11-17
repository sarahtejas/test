import theme from '@circleci/theme';
import { addDecorator, addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from 'emotion-theming';

import '~/globalStyles';
import { makePublicRouterInstance } from 'next/dist/client/router';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

const router = {
  // @ts-ignore --noImplicitAny
  push: async (..._: any[]) => null,
  // @ts-ignore --noImplicitAny
  prefetch: async (..._: any[]) => null,
  asPath: '/test/test',
  pathname: '/test/test',
  query: {
    vcsType: 'github',
    username: 'some-user',
  },
} as any;

addDecorator(story => (
  <RouterContext.Provider value={makePublicRouterInstance(router)}>
    {story()}
  </RouterContext.Provider>
));

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
