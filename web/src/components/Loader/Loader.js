import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import LoadingIcon from 'react-feather/dist/icons/loader';

const spin = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled(LoadingIcon).attrs(({ size, color }) => ({
  size: size || '48',
  color: color || 'red',
}))`
  transform-origin: center center;
  animation: ${spin} 1.5s linear infinite;
`;

/**
 * Loading component used to display loading animation or an error message if the
 * content cannot be loaded.
 */
class Loader extends PureComponent {
  // Store timeout ID to later clear out on unmount
  delayTimeout = null;

  constructor({ delay }) {
    super();
    this.state = {
      show: !delay,
    };
  }

  componentDidMount() {
    const { delay } = this.props;

    if (delay) {
      this.delayShow(delay);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimeout);
  }

  /**
   * Delay rendering of spinner
   *
   * @param {number} delay Milliseconds to delay render
   */
  delayShow(delay) {
    // Store timeout ID to later clear out on unmount
    this.delayTimeout = setTimeout(() => {
      this.setState({
        show: true,
      });
    }, delay);
  }

  render() {
    const { size, color } = this.props;
    const { show } = this.state;

    return <>{show && <Spinner data-testid="spinner" size={size} color={color} />}</>;
  }
}

Loader.propTypes = {
  /**
   * Size of Spinner Icon
   */
  size: PropTypes.string,
  /**
   * Color of Spinner Icon
   */
  color: PropTypes.string,
  /**
   * How long to wait to render Spinner
   */
  delay: PropTypes.number,
};

Loader.defaultProps = {
  size: '48',
  color: 'red',
  delay: null,
};

export default Loader;
