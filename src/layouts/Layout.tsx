import React, { ReactNode } from 'react';
import { css, Global, ThemeProvider } from '@emotion/react';
import 'typeface-open-sans';
import 'typeface-candal';
import { SEO } from '@components/index';
import { NavBar, Footer } from '@layouts/index';
import theme from '@config/theme';
import headroom from '@styles/headroom';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    <>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          html {
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            box-sizing: border-box;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }

          body {
            color: #fff;
            background-color: #282c34;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          a {
            transition: color 0.5s;
            text-decoration: none;
          }
          a:hover {
            text-decoration: none;
          }
          h1 {
            font-family: ${theme.fontFamily.heading};
          }

          ${headroom}
        `}
      />
      <SEO />
      <NavBar />
      {children}
      <Footer />
    </>
  </ThemeProvider>
);

export default Layout;
