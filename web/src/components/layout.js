import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import SEO from 'components/seo';

import { mq } from 'utils';

const GlobalStyle = createGlobalStyle`
  & body {
    background: #010203;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    overflow-x: hidden;
  }

  & a {
    text-decoration: none;

    ${mq.desktop`
      &:hover {
        text-decoration: underline;
        text-decoration-skip: ink;
      }
    `}
  }
`;

const LayoutWrapper = styled.div`
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  /* background: red; */
`;

const Layout = ({ children }) => (
  <>
    <SEO />
    <GlobalStyle />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
