import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

// import {
//   GraphQLErrorList,
//   SEO,
//   Layout,
//   BgImageSlider,
//   PortableText,
//   Header,
//   useToggle,
//   BookingModal,
// } from 'components';

import GraphQLErrorList from 'components/graphql-error-list';
import Layout from 'components/layout';
import PortableText from 'components/portableText';
import Header from 'components/header';
import useToggle from 'components/UseToggle';
import BookingModal from 'components/bookingModal';

import Slider from 'components/Slider';

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
    ${scale(-0.05)}
    color: ${colors.white};
  }
`;

const MainButton = styled.button`
  ${scale(-0.15)}
  outline: 0;
  border: 0;
  color: ${colors.black};
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  background-color: ${colors.beige.light};
  border-radius: 30px;
  width: 200px;
  height: 50px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  line-height: 0;
  padding: 0;

  &:hover {
    background-color: ${colors.beige.base};
  }
`;

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    homepage: sanityIndexPage(_id: { regex: "/(drafts.|)indexPage/" }) {
      headlineText
      _rawSubhead
      buttonText
      bgImages {
        alt
        asset {
          fluid(maxWidth: 1800) {
            ...GatsbySanityImageFluid
          }
          url
          assetId
          _id
        }
      }
    }

    # backgrounds: sanityIndexPage(_id: { regex: "/(drafts.|)indexPage/" }) {
    #   bgImages {
    #     alt
    #     asset {
    #       fluid(maxWidth: 1800) {
    #         ...GatsbySanityImageFluid
    #       }
    #       url
    #       assetId
    #     }
    #   }
    # }
  }
`;

const IndexPage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = data && data.site;
  const homepage = (data && data.homepage) || '';

  const imageBgNodes = homepage && homepage.bgImages;

  const [openBookingModal, toggleBookingModal] = useToggle(false);

  if (!site) {
    throw new Error('Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data');
  }

  return (
    <Layout>
      <Header />
      <Slider slides={imageBgNodes} autoPlay={7} />
      <MainTextWrapper>
        <h1>{homepage.headlineText}</h1>
        {homepage._rawSubhead && <PortableText blocks={homepage._rawSubhead} />}
        <MainButton type="button" onClick={() => toggleBookingModal()}>
          {homepage.buttonText}
        </MainButton>
      </MainTextWrapper>
      <BookingModal onClose={() => toggleBookingModal()} isModalOpen={openBookingModal} />
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
