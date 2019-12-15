import React from 'react';
import { PropTypes } from 'prop-types';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  & body {
    background: #010203;
  }

  & a {
    color: #0e0fed;
    text-decoration: underline;
    text-decoration-skip: ink;

    &:hover {
      color: #000000;
    }
  }
`;

const LayoutWrapper = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
