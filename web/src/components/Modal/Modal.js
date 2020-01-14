import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import X from 'react-feather/dist/icons/x';
import { Transition } from 'react-transition-group';
import { colors, mq } from 'utils';

import Portal from '../../hooks/createPortal';

const AbsoluteCenter = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 100px);
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  max-width: ${props => props.maxModalWidth};
  background: ${props => props.background};
  max-height: ${props => props.maxHeight};
  overflow: ${props => props.overflow || 'scroll'};
  z-index: 999999;

  ${mq.desktop`
    width: ${props => props.modalWidth};
  `}

  ${props => (props.centered ? AbsoluteCenter : null)};

  ${props =>
    props.issidepanel
      ? css`
          position: fixed;
          top: 0;
        `
      : null};

  ${props =>
    props.issidepanelright
      ? css`
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
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

const ModalBackground = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  background: #0000009c;
  opacity: 0;
  transition: opacity 1s linear;

  ${props => (props.isActive ? 'opacity: 1;' : null)}
`;

const CloseIcon = styled(X).attrs({
  size: 32,
})``;

const Modal = ({
  issidepanel,
  issidepanelright,
  centered,
  background,
  modalWidth,
  maxModalWidth,
  onClose,
  title,
  children,
  className,
  onKeyDown,
  isModalOpen,
  onEnter,
  onExit,
  timeout,
}) => {
  const closeIconWrapper = (
    <IconContainer onClick={onClose} data-testid="modal-close">
      <CloseIcon color={issidepanel ? colors.beige.light : colors.grey.dark} />
    </IconContainer>
  );

  const modalMarkup = (
    <>
      <Transition in={isModalOpen} onEnter={onEnter} onExit={onExit} unmountOnExit timeout={timeout}>
        <Portal>
          <ModalWrapper
            issidepanel={issidepanel}
            issidepanelright={issidepanelright}
            className={className}
            modalWidth={modalWidth}
            maxModalWidth={maxModalWidth}
            background={background}
            centered={centered}
            onKeyDown={onKeyDown}
            data-testid="modal-wrapper"
          >
            <ModalHeader>
              {(issidepanel || issidepanelright) && closeIconWrapper}
              {issidepanel ||
                (issidepanelright !== true && title && <ModalTitle data-testid="modal-header">{title}</ModalTitle>)}
            </ModalHeader>
            {children}
          </ModalWrapper>
        </Portal>
      </Transition>

      {isModalOpen && <ModalBackground onClick={onClose} isActive={isModalOpen} />}
    </>
  );

  return modalMarkup;
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
