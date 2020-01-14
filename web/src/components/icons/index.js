import React from 'react';
import PropTypes from 'prop-types';
import HamburgerIcon from './hamburger';
import SpecialIcon from './special';

function Icon({ symbol, color, size }) {
  switch (symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    case 'special':
      return <SpecialIcon color={color} size={size} />;
    default:
      return <span>Unknown icon: {symbol}</span>;
  }
}

Icon.propTypes = {
  color: PropTypes.string,
  symbol: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Icon.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default Icon;
