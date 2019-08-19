import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { GraphQLErrorList, SEO, Layout, BgImageSlider, PortableText } from 'components';

import { colors, scale } from 'utils';

const MainTextWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 37.5rem;
  max-width: 80vw;
  height: 20vh;
  margin: auto;
  text-align: center;

  & h1 {
    ${scale(1.15)}
    color: ${colors.white};
    text-transform: uppercase;
  }

  & p {
    color: ${colors.white};
  }
`;

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }

    homepage: sanityIndexPage(_id: { eq: "indexPage" }) {
      headlineText
      _rawSubhead
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

const IndexPage = ({ data, errors, _rawSubhead }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = data && data.site;
  const homepage = data && data.homepage;
  const imageBgNodes = homepage && homepage.bgImages;

  if (!site) {
    throw new Error('Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data');
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <BgImageSlider imageSlides={imageBgNodes} />
      <MainTextWrapper>
        <h1>{homepage.headlineText}</h1>
        {homepage._rawSubhead && <PortableText blocks={homepage._rawSubhead} />}
      </MainTextWrapper>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.any.isRequired,
  errors: PropTypes.any,
  site: PropTypes.any,
  homepage: PropTypes.any,
};

IndexPage.defaultProps = {
  errors: null,
  site: null,
  homepage: null,
};

export default IndexPage;
