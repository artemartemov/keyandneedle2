import React from 'react';
import HamburgerIcon from './hamburger';

function Icon({ symbol }) {
  switch (symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    default:
      return <span>Unknown icon: {symbol}</span>;
  }
}

export default Icon;
