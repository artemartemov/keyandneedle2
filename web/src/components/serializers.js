import React from 'react';
import PropTypes from 'prop-types';
import Figure from 'components/Figure';

const authorReferenceType = ({ node }) => <span>{node.author.name}</span>;

const serializers = {
  types: {
    authorReference: authorReferenceType,
    mainImage: Figure,
  },
};

authorReferenceType.propTypes = {
  node: PropTypes.any.isRequired,
};

export default serializers;
