import React from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap';

import {
  GraphQLErrorList,
  SEO,
  Layout,
  BgImageSlider,
  PortableText,
  Modal,
  Iframe,
  useToggle,
  Loader,
  keyPress,
} from 'components';

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

const ModalWrapper = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  background: #0000009c;
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

const LoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

const IndexPage = ({ data, errors, _rawSubhead, open }) => {
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

  const [openModal, toggleModal] = useToggle(false);

  const [isLoading, toggleLoader] = useToggle(true);

  const duration = 300;

  const animation = (target, dur) =>
    TweenMax.fromTo(
      target,
      dur / 1000,
      {
        xPercent: -100,
        // eslint-disable-next-line
      ease: Power0.easeInOut
      },
      {
        xPercent: 0,
      }
    );

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
        <MainButton type="button" onClick={() => toggleModal()}>
          {homepage.buttonText}
        </MainButton>
      </MainTextWrapper>

      {openModal && <ModalWrapper onClick={() => toggleModal(false)} />}
      <Transition
        in={openModal}
        onEnter={node => {
          animation(node, duration);
        }}
        onExit={node => {
          animation(node, duration).reverse(0);
        }}
        unmountOnExit
        timeout={duration}
      >
        <Modal
          title="My Cool Modal"
          isSidePanel
          maxModalWidth="600px"
          modalWidth="66%"
          background="#ffffff"
          onClose={() => toggleModal()}
          onKeyDown={keyPress('Escape', toggleModal)}
        >
          {isLoading && (
            <LoadingWrapper>
              <Loader delay={0} size="4rem" color={colors.beige.light} />
            </LoadingWrapper>
          )}
          <Iframe
            url="https://airtable.com/embed/shrYt1GdXzl42pHsc?backgroundColor=yellow"
            onLoad={() => toggleLoader(false)}
          />
        </Modal>
      </Transition>
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
