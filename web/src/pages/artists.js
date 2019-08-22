import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

export const query = graphql`
  query ArtistPageQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }

    homepage: sanityIndexPage(_id: { eq: "indexPage" }) {
      headlineText
      _rawSubhead
      buttonText
      bgImages {
        asset {
          fluid(maxWidth: 1800) {
            ...GatsbySanityImageFluid
          }
          url
          _id
        }
      }
    }
  }
`;

const ArtistListingPage = ({ data, errors }) => false;

export default ArtistListingPage;
