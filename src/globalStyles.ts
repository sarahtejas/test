import { injectGlobal } from 'emotion';
import emotionNormalize from 'emotion-normalize';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${emotionNormalize}
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  @font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto-Light.eot");
    src: url("/fonts/Roboto-Light.eot?#iefix") format('embedded-opentype'),
         url("/fonts/Roboto-Light.woff2") format('woff2'),
         url("/fonts/Roboto-Light.woff") format('woff'),
         url("/fonts/Roboto-Light.ttf") format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto-Regular.eot");
    src: url("/fonts/Roboto-Regular.eot?#iefix") format('embedded-opentype'),
        url("/fonts/Roboto-Regular.woff2") format('woff2'),
        url("/fonts/Roboto-Regular.woff") format('woff'),
        url("/fonts/Roboto-Regular.ttf") format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto-Medium.eot");
    src: url("/fonts/Roboto-Medium.eot?#iefix") format('embedded-opentype'),
        url("/fonts/Roboto-Medium.woff2") format('woff2'),
        url("/fonts/Roboto-Medium.woff") format('woff'),
        url("/fonts/Roboto-Medium.ttf") format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "Roboto";
    src: url('/fonts/Roboto-Bold.eot');
    src: url('/fonts/Roboto-Bold.eot?#iefix') format('embedded-opentype'),
        url('/fonts/Roboto-Bold.woff2') format('woff2'),
        url('/fonts/Roboto-Bold.woff') format('woff'),
        url('/fonts/Roboto-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  html {
    font-family: 'Roboto', sans-serif;
  }
  html, body, #__next, #root {
    width: 100%;
    min-height: 100vh;
  }
  
  #__next, #root {
    display: flex;
    flex-direction: column;
  }
`;
