import PropTypes from 'prop-types';
import React from 'react';

const SliderContent = ({ translate, transition, width, children }) => (
  <div
    className="SliderContent"
    css={`
      transform: translateX(-${translate}px);
      transition: transform ease-out ${transition}s;
      height: 100%;
      width: ${width}px;
      display: flex;
    `}
  >
    {children}
  </div>
);

SliderContent.propTypes = {
  children: PropTypes.node.isRequired,
  transition: PropTypes.number.isRequired,
  translate: PropTypes.number.isRequired,
  width: PropTypes.any.number.isRequired,
};

export default SliderContent;
