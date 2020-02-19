import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { TweenMax } from 'gsap';

import { scale, mq, colors } from 'utils';

import Modal from 'components/Modal/Modal';
import GoogleMap from 'components/googleMap';

import UseContactData from '../hooks/contact-data';

const ContactModalContent = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);

  ${mq.desktopWide`
    justify-content: space-between;
  `}
`;

const GoogleMapContainer = styled.div`
  display: flex;
`;

const ContactInfoContainer = styled.div`
  flex: 1 0 55%;

  ${mq.desktop`
    flex: 0;
    margin: 4vh 0 5rem;
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
  margin-bottom: 0;

  ${mq.tablet`
    ${scale(-0)};
  `}

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

const ContactModal = ({ onClose, isModalOpen }) => {
  const data = useStaticQuery(
    graphql`
      query LocationData {
        sanityContactPage(_id: { regex: "/(drafts.|)contactPage/" }) {
          location {
            lat
            lng
          }
        }
      }
    `
  );
  const contactData = (data && data.sanityContactPage) || '';

  const duration = 300;
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
  return (
    <Modal
      title="Contact Modal"
      issidepanelright
      maxModalWidth="600px"
      modalWidth="66%"
      background={colors.beige.light}
      onClose={onClose}
      isModalOpen={isModalOpen}
      onEnter={node => {
        contactModalAnimation(node, duration);
      }}
      onExit={node => {
        contactModalAnimation(node, duration).reverse(0);
      }}
      timeout={duration}
      // onKeyDown={keyPress('Escape', () => toggleContactModal())}
    >
      <ContactModalContent>
        <ContactInfoContainer>
          <ModalSectionHeading>
            <span>K+N Studio</span>
          </ModalSectionHeading>
          <UseContactData />
        </ContactInfoContainer>
        <GoogleMapContainer>
          <GoogleMap
            center={[contactData.location.lat, contactData.location.lng]}
            lat={contactData.location.lat}
            lng={contactData.location.lng}
          />
        </GoogleMapContainer>
      </ContactModalContent>
    </Modal>
  );
};

ContactModal.defaultProps = {
  isModalOpen: false,
};

ContactModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
};

export default ContactModal;
