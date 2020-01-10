import React from 'react';
import PropTypes from 'prop-types';

const SpecialIcon = ({ color, size }) => (
  <svg
    fill={color}
    enableBackground="new 0 0 64 64"
    height={size}
    viewBox="0 0 64 64"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m29.88 52.41c.17.06.34.09.52.09.49 0 .97-.25 1.25-.68l11.99-18.27c.25-.38.31-.85.17-1.28s-.47-.78-.89-.94l-9.18-3.52 1.61-14.64c.08-.7-.34-1.35-1-1.58s-1.39.03-1.76.63l-12.26 19.72c-.24.38-.29.85-.15 1.28.15.43.47.76.89.92l9.42 3.52-1.59 13.16c-.07.69.33 1.35.98 1.59zm-6.03-20.44 7.81-12.57-1.01 9.23c-.07.68.32 1.32.95 1.56l8.52 3.27-7.46 11.37.96-7.98c.08-.69-.32-1.34-.96-1.58z" />
  </svg>
);

SpecialIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SpecialIcon.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default SpecialIcon;
