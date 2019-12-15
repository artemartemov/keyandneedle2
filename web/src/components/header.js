import { Link } from 'gatsby';
import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { colors } from 'utils';
import LogoIcon from './icons/logo.svg';

const HeaderWrapper = styled.header`
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 2rem 4%;
`;

const Logo = styled(animated(Link))`
  z-index: 10;
  display: flex;
`;

const Navigation = styled.nav`
  margin-left: auto;

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    margin: 0;

    & li + li {
      margin-left: 1rem;
    }
  }
`;

const Header = ({ onClick }) => {
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
      <Navigation>
        <ul>
          <li>
            <a tabIndex="0" role="button" onKeyDown={onClick} onClick={onClick}>
              Contact
            </a>
          </li>
          <li>
            <Link to="/gearListing">Gear</Link>
          </li>
        </ul>
      </Navigation>

      {/* <button type="button" onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button> */}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
};

Header.defaultProps = {
  onClick: null,
};

export default Header;
