import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TweenMax } from 'gsap';

import { colors } from 'utils';

// import { Modal, useToggle, Loader, Iframe } from 'components';

import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import useToggle from 'components/UseToggle';
import Iframe from 'components/iframe';

const LoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const BookingModal = ({ onClose, isModalOpen }) => {
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
  return (
    <Modal
      title="Contact Modal"
      issidepanel
      maxModalWidth="600px"
      modalWidth="66%"
      background={colors.white}
      onClose={onClose}
      isModalOpen={isModalOpen}
      onEnter={node => {
        bookingModalAnimation(node, duration);
      }}
      onExit={node => {
        bookingModalAnimation(node, duration).reverse(0);
      }}
      timeout={duration}
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
  );
};

BookingModal.defaultProps = {
  isModalOpen: false,
};

BookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
};

export default BookingModal;
