import React from 'react';
import PropTypes from 'prop-types';

import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

const timeout = 75;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    translate: 'translateY(-100%)',
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out, translate ${timeout}ms ease-in-out`,
    translate: 'translateY(0)',
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out, translate ${timeout}ms ease-in-out`,
    opacity: 0,
    translate: 'translateY(-100%)',
  },
};
class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props;
    return (
      <TransitionGroup>
        <ReactTransition
          key={location.pathname.toString()}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    );
  }
}

Transition.propTypes = {
  children: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Transition;
