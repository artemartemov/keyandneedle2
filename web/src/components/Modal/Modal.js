import React from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import X from 'react-feather/dist/icons/x';
import { colors } from 'utils';

const AbsoluteCenter = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 100px);
`;

export const ModalWrapper = styled.div`
  width: ${props => props.modalWidth};
  max-width: ${props => props.maxModalWidth};
  background: ${props => props.background};
  max-height: ${props => props.maxHeight};
  overflow: ${props => props.overflow || 'scroll'};
  z-index: 999999;

  ${props => (props.centered ? AbsoluteCenter : null)};

  ${props =>
    props.isSidePanel
      ? css`
          position: fixed;
          top: 0;
        `
      : null};
`;

const ModalHeader = styled.div`
  display: flex;
  font-size: 0.6875rem;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  height: 3rem;
  position: fixed;
  width: 100%;
  justify-content: flex-end;
`;

const ModalTitle = styled.h2`
  width: 100%;
  margin: 0;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 3.5;
  color: white;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  text-align: center;
`;

const IconContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  cursor: pointer;
  float: right;
`;

const Modal = ({
  isSidePanel,
  centered,
  background,
  modalWidth,
  maxModalWidth,
  onClose,
  title,
  children,
  className,
  onKeyDown,
}) => {
  const closeIconWrapper = (
    <IconContainer onClick={onClose} data-testid="modal-close">
      <X color={colors.beige.light} size={32} />
    </IconContainer>
  );

  const modalMarkup = (
    <ModalWrapper
      isSidePanel={isSidePanel}
      className={className}
      modalWidth={modalWidth}
      maxModalWidth={maxModalWidth}
      background={background}
      centered={centered}
      onKeyDown={onKeyDown}
      data-testid="modal-wrapper"
    >
      <ModalHeader>
        {isSidePanel && closeIconWrapper}
        {isSidePanel !== true && title && <ModalTitle data-testid="modal-header">{title}</ModalTitle>}
      </ModalHeader>
      {children}
    </ModalWrapper>
  );

  return createPortal(modalMarkup, document.body);
};

Modal.propTypes = {
  /**
   * Child nodes
   */
  children: PropTypes.node.isRequired,
  /**
   * Close handler for modal button
   */
  onClose: PropTypes.func,
  /**
   * Title text to show in header
   */
  title: PropTypes.string.isRequired,
  /**
   * Whether to show a close icon
   */
  showCloseIcon: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: null,
  showCloseIcon: true,
};

export default Modal;
