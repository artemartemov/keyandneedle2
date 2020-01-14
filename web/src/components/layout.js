import React from 'react';
import { PropTypes } from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import { mq } from 'utils';

const GlobalStyle = createGlobalStyle`
  & body {
    background: #010203;
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
  width: 100%;
  height: 100%;
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
