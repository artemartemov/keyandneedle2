import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

export const query = graphql`
  query ArtistPageQuery {
  }
`;

const ArtistListingPage = ({ data, errors }) => false;

export default ArtistListingPage;
