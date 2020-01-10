import React from 'react';
import { PropTypes } from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import { Transition } from 'components';
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

const Layout = ({ children, location }) => (
  <>
    <GlobalStyle />
    <Transition location={location}>{children}</Transition>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
