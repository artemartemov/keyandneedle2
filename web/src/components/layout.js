import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Header } from 'components';

const GlobalStyle = createGlobalStyle`
 &  body {
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

const Layout = ({ children, companyInfo, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <GlobalStyle />
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
);

export default Layout;
