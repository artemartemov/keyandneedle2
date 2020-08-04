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
  content: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default Slide;
