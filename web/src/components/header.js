import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { colors } from 'utils';
import LogoIcon from './icons/logo.svg';

const HeaderWrapper = styled.header`
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
`;

const Logo = styled(animated(Link))`
  position: absolute;
  z-index: 10;
  left: 32px;
`;

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  const logoAnimations = useSpring({
    from: {
      opacity: 0,
      top: '-10rem',
      left: '32px',
    },
    opacity: 1,
    left: '32px',
    top: '2rem',
  });

  return (
    <HeaderWrapper>
      <Logo to="/" style={logoAnimations}>
        <LogoIcon width="2rem" height="100%" fill={colors.beige.base} />
      </Logo>

      {/* <button type="button" onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button> */}

      {/* <nav>
        <ul>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/projects/">Projects</Link>
          </li>
          <li>
            <Link to="/blog/">Blog</Link>
          </li>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
        </ul>
      </nav> */}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  onHideNav: PropTypes.any.isRequired,
  onShowNav: PropTypes.any.isRequired,
  showNav: PropTypes.bool.isRequired,
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
