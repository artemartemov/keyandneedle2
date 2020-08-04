import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ content, width }) => (
  <div
    className="Slide"
    css={`
      height: 100%;
      width: ${width}px;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
);

Slide.propTypes = {
  content: PropTypes.string.isRequired,
  width: PropTypes.any,
};

Slide.defaultProps = {
  width: '800',
};

export default Slide;
