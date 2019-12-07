import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MarkerIcon from './icons/marker.svg';

const Wrapper = styled(MarkerIcon)`
  display: block;
  user-select: none;
  cursor: pointer;
  z-index: 99999;
  width: 37px;
  height: 50px;
`;

// eslint-disable-next-line react/jsx-props-no-spreading
const Marker = ({ text }) => <Wrapper alt={text} />;

Marker.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Marker;
