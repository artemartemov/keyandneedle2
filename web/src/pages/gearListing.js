import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { GraphQLErrorList, SEO, Layout, Header } from 'components';

import { scale } from 'utils';

const GearListingWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const GearSectionCounter = styled.span`
  ${scale(-0.2)};
  position: absolute;
  top: -0.5rem;
  left: -2rem;
  color: gray;
  letter-spacing: 0.15em;
  font-weight: 200;
`;

const GearSectionTitle = styled.h1`
  ${scale(1.5)};
  position: relative;
  width: 100%;
  word-break: break-all;
  color: white;
`;

const GearSection = styled.div`
  position: relative;

  & + & {
    margin-top: 8vh;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    color: white;

    li {
      margin-bottom: 2%;
    }
  }
`;

export const query = graphql`
  query GearListingPageQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }

    gearListing: sanityGearPage(_id: { eq: "gearPage" }) {
      gearPageSection {
        _key
        sectionTitle
        gearItems {
          _key
          gearItemTitle
          gearSpecialRequest
        }
      }
    }
  }
`;

const GearListingPage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = data && data.site;

  const gearData = (data && data.gearListing.gearPageSection) || '';

  // console.log(gearData);
  //   const gearListingPage = data && data.gearListing;

  if (!site) {
    throw new Error('Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data');
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Header />

      <GearListingWrapper>
        {gearData.map(({ sectionTitle, gearItems }, i) => (
          <GearSection key={i.toString()}>
            <GearSectionTitle>
              <GearSectionCounter>+0{i + 1} </GearSectionCounter>
              {sectionTitle}
            </GearSectionTitle>
            <ul>
              {gearItems.map(({ gearItemTitle, gearSpecialRequest, _key }) => (
                <React.Fragment key={_key}>
                  <li>{gearItemTitle}</li>
                  {gearSpecialRequest && <pre>special, yo++</pre>}
                </React.Fragment>
              ))}
            </ul>
          </GearSection>
        ))}
      </GearListingWrapper>
    </Layout>
  );
};

GearListingPage.propTypes = {
  data: PropTypes.any.isRequired,
  errors: PropTypes.any,
  site: PropTypes.any,
};

GearListingPage.defaultProps = {
  errors: null,
  site: null,
};

export default GearListingPage;
