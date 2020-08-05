import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { colors, scale } from 'utils';
import useToggle from 'components/UseToggle';
import ContactModal from 'components/contactModal';
import LogoIcon from './icons/logo.svg';

const HeaderWrapper = styled.header`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
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

  a {
    ${scale(0.05)};
    color: ${colors.white};
    cursor: pointer;
  }
`;

const Header = () => {
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

  const [openContactModal, toggleContactModal] = useToggle(false);

  return (
    <HeaderWrapper>
      <Logo to="/" style={logoAnimations}>
        <LogoIcon width="2rem" height="100%" fill={colors.beige.base} />
      </Logo>
      <Navigation>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gearListing">Gear</Link>
          </li>
          <li>
            <a tabIndex="0" role="button" onKeyDown={() => toggleContactModal()} onClick={() => toggleContactModal()}>
              Contact
            </a>
          </li>
        </ul>
      </Navigation>
      <ContactModal onClose={() => toggleContactModal()} isModalOpen={openContactModal} />

      {/* <button type="button" onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol="hamburger" />
      </button> */}
    </HeaderWrapper>
  );
};

export default Header;
