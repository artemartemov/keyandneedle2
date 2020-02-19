import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import 'react-tippy/dist/tippy.css';

import Img from 'gatsby-image';

import { Tooltip } from 'react-tippy';

// import { GraphQLErrorList, SEO, Layout, Header, Icon } from 'components';

import GraphQLErrorList from 'components/graphql-error-list';
import Layout from 'components/layout';
import Header from 'components/header';
import Icon from 'components/icons/';

import { scale, colors, mq } from 'utils';
import '../components/tippyStyles.css';

const ByRequestIcon = styled(Icon).attrs({
  symbol: 'special',
  color: colors.grey.medium,
  size: '20',
})`
  margin-bottom: 10px;
`;

const GearListingWrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
`;

const GearSectionCounter = styled.span`
  ${scale(-0.2)};
  position: absolute;
  top: -0.5rem;
  left: -2rem;
  color: gray;
  letter-spacing: 0.15em;
  font-weight: 200;

  ${mq.desktop`
    transition: left 0.2s linear;
  `}
`;

const GearItemCount = styled.span`
  ${scale(-0.3)};
  border-radius: 0.25rem;
  background-color: #3c3c3c;
  color: #a8a8a8;
  padding: 3px;
  margin-right: 10px;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GearSectionTitle = styled.h1`
  position: relative;
  width: 100%;
  word-break: break-all;
  color: white;

  ${mq.mobileWide`
    ${scale(1.2)};
    transform: scale(1);
    transition: transform 0.2s linear;
  `}

  ${mq.tablet`
    ${scale(1.5)};
    transform: scale(1);
    transition: transform 0.2s linear;
  `}

  ${mq.desktop`
   ${scale(1.75)};
    transform: scale(1);
    transition: transform 0.2s linear;
  `}
`;

const GearSection = styled.div`
  position: relative;
  margin: 0 0.25rem 0 2.5rem;

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
      display: flex;
      align-items: center;
    }
  }

  ${mq.desktop`
    &:hover {
      ${GearSectionTitle} {
        transform: scale(1.01);
      }

      ${GearSectionCounter} {
        left: -2.25rem;
      }
    }

    li {
      transition: opacity 0.2s linear;

      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;

const StyledImg = styled(Img)`
  border-radius: 4px;
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
          gearItemCount
          gearSpecialRequest
          gearItemImage {
            asset {
              fixed(width: 300) {
                ...GatsbySanityImageFixed
              }
              url
              _id
            }
          }
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

  if (!site) {
    throw new Error('Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data');
  }

  const RenderImagePreview = ({ imageSource }) => (
    // Each item requires a unique key. Also we are controling the opactiy prop from
    // styled components in the first few lines of the document
    <StyledImg fixed={imageSource && imageSource} />
  );

  return (
    <Layout>
      <Header />

      <GearListingWrapper>
        {gearData.map(({ sectionTitle, gearItems }, i) => (
          <GearSection key={i.toString()}>
            <GearSectionTitle>
              <GearSectionCounter>+0{i + 1} </GearSectionCounter>
              {sectionTitle}
            </GearSectionTitle>
            <ul>
              {gearItems.map(
                ({ gearItemTitle, gearSpecialRequest: gearspecialrequest, gearItemCount, _key, gearItemImage }) => (
                  <React.Fragment key={_key}>
                    {gearItemImage && gearItemImage ? (
                      <Tooltip
                        trigger="mouseenter"
                        followCursor
                        unmountHTMLWhenHide
                        inertia
                        distance="2"
                        animation="fade"
                        size="small"
                        theme="custom"
                        html={<RenderImagePreview imageSource={gearItemImage.asset.fixed} />}
                      >
                        <li>
                          <GearItemCount>{gearItemCount || '1'}</GearItemCount>
                          {gearItemTitle}
                        </li>
                      </Tooltip>
                    ) : (
                      <li>
                        <GearItemCount>{gearItemCount || '1'}</GearItemCount>

                        {gearItemTitle}

                        {gearspecialrequest && (
                          <Tooltip
                            trigger="mouseenter"
                            unmountHTMLWhenHide
                            inertia
                            distance="2"
                            animation="fade"
                            html="By special request only"
                          >
                            <ByRequestIcon />
                          </Tooltip>
                        )}
                      </li>
                    )}
                  </React.Fragment>
                )
              )}
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
  // eslint-disable-next-line react/no-unused-prop-types
  imageSource: PropTypes.string,
};

GearListingPage.defaultProps = {
  errors: null,
  site: null,
  imageSource: ' []',
};

export default GearListingPage;
