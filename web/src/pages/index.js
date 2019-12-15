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
  Header,
  Iframe,
  useToggle,
  Loader,
  GoogleMap,
} from 'components';

import { colors, scale, mq } from 'utils';

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

const ContactModalContent = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  ${mq.desktopWide`
    justify-content: space-around;
  `}
`;

const GoogleMapContainer = styled.div`
  display: flex;
`;

const ContactInfoContainer = styled.div`
  flex: 1 0 55%;

  ${mq.desktop`
    flex: 0;
    margin-bottom: 5rem;
  `}
`;

const ModalSectionHeading = styled.h3`
  ${scale(-0)}
  text-align: center;
  padding: 0;
  line-height: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  & span {
    display: inline-flex;
    position: relative;
    align-items: center;

    &:before,
    &:after {
      content: '';
      position: absolute;
      border-bottom: 0.125rem solid rgba(0, 0, 0, 0.6);
      width: 2.25rem;
      border-radius: 0.125rem;
    }

    &:before {
      right: 100%;
      margin-right: 0.9375rem;
    }

    &:after {
      left: 100%;
      margin-left: 0.9375rem;
    }
  }
`;

const ContactItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    ${scale(0.25)}
    color: #000;
    line-height: 1.7;
    margin: 1.25rem 0 0;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  p,
  a {
    ${scale(-0.3)}
    line-height: 1.45;
    margin: 0;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
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
      location {
        lat
        lng
      }
    }

    contact: sanityContactPage(_id: { eq: "contactPage" }) {
      employeeListing {
        employee {
          name
          position
          email
          phoneNumber
        }
      }
    }
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
  const contactData = (data && data.contact.employeeListing) || '';

  const imageBgNodes = homepage && homepage.bgImages;

  const [openBookingModal, toggleBookingModal] = useToggle(false);
  const [openContactModal, toggleContactModal] = useToggle(false);

  const [isLoading, toggleLoader] = useToggle(true);

  const duration = 300;

  const bookingModalAnimation = (target, dur) =>
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

  const contactModalAnimation = (target, dur) =>
    TweenMax.fromTo(
      target,
      dur / 1000,
      {
        xPercent: 100,
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
      <Header onClick={() => toggleContactModal(false)} />
      <BgImageSlider imageSlides={imageBgNodes} />
      <MainTextWrapper>
        <h1>{homepage.headlineText}</h1>
        {homepage._rawSubhead && <PortableText blocks={homepage._rawSubhead} />}
        <MainButton type="button" onClick={() => toggleBookingModal()}>
          {homepage.buttonText}
        </MainButton>
      </MainTextWrapper>

      {openBookingModal && <ModalWrapper onClick={() => toggleBookingModal(false)} />}
      <Transition
        in={openBookingModal}
        onEnter={node => {
          bookingModalAnimation(node, duration);
        }}
        onExit={node => {
          bookingModalAnimation(node, duration).reverse(0);
        }}
        unmountOnExit
        timeout={duration}
      >
        <Modal
          title="My Cool Modal"
          issidepanel
          maxModalWidth="600px"
          modalWidth="66%"
          background="#ffffff"
          onClose={() => toggleBookingModal()}
          // onKeyDown={keyPress('Escape', () => toggleBookingModal())}
        >
          {isLoading && (
            <LoadingWrapper>
              <Loader delay={0} size="4rem" color={colors.beige.light} />
            </LoadingWrapper>
          )}
          <Iframe
            url="https://airtable.com/embed/shrYt1GdXzl42pHsc?backgroundColor=yellow"
            onLoad={() => toggleLoader(false)}
            id="booking-embed"
          />
        </Modal>
      </Transition>

      {openContactModal && <ModalWrapper onClick={() => toggleContactModal(false)} />}
      <Transition
        in={openContactModal}
        onEnter={node => {
          contactModalAnimation(node, duration);
        }}
        onExit={node => {
          contactModalAnimation(node, duration).reverse(0);
        }}
        unmountOnExit
        timeout={duration}
      >
        <Modal
          title="Contact Modal"
          issidepanelright
          maxModalWidth="600px"
          modalWidth="66%"
          background={colors.beige.light}
          onClose={() => toggleContactModal()}
          // onKeyDown={keyPress('Escape', () => toggleContactModal())}
        >
          <ContactModalContent>
            <ContactInfoContainer>
              <ModalSectionHeading>
                <span>K+N Studio</span>
              </ModalSectionHeading>

              <ContactItemContainer>
                {contactData.map(({ employee }, i) => (
                  <ContactItem key={i.toString()}>
                    <h1>{employee.name}</h1>
                    <p>{employee.position}</p>
                    <a href={`mailto:${employee.email}`}>{employee.email}</a>
                    <a href={`tel:${employee.phoneNumber}`}>{employee.phoneNumber}</a>
                  </ContactItem>
                ))}
              </ContactItemContainer>
            </ContactInfoContainer>

            <GoogleMapContainer>
              <GoogleMap
                center={[homepage.location.lat, homepage.location.lng]}
                lat={homepage.location.lat}
                lng={homepage.location.lng}
              />
            </GoogleMapContainer>
          </ContactModalContent>
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
