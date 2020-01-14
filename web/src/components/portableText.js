import React from 'react';
import BasePortableText from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';
import clientConfig from '../../client-config';
import serializers from './serializers';

const PortableText = ({ blocks }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <BasePortableText blocks={blocks} serializers={serializers} {...clientConfig.sanity} />
);
export default PortableText;

PortableText.propTypes = {
  serializers: PropTypes.shape({
    // Common overrides
    types: PropTypes.object,
    marks: PropTypes.object,

    // Less common overrides
    list: PropTypes.func,
    listItem: PropTypes.func,

    // Low-level serializers
    block: PropTypes.func,
    span: PropTypes.func,
  }),

  blocks: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        _type: PropTypes.string.isRequired,
      })
    ),
    PropTypes.shape({
      _type: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

PortableText.defaultProps = {
  serializers: {},
};
