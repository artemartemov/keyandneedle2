import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';

class Iframe extends PureComponent {
  render() {
    const { onLoad, id, className, url, title, styles } = this.props;

    const iframeProps = {
      ref: 'iframe',
      frameBorder: '0',
      src: url,
      target: '_parent',
      title,
      style: objectAssign(
        {},
        {
          display: 'block',
          width: '100%',
          height: '100vh',
        },
        styles || {}
      ),
      name: '',
      width: '100%',
      onLoad,
      id,
      className,
    };

    return createElement('iframe', objectAssign(iframeProps));
  }
}

Iframe.propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  styles: PropTypes.object,
};

Iframe.defaultProps = {
  url: '',
  id: '',
  title: '',
  className: '',
  onLoad: null,
  styles: {
    styles: () => {},
  },
};

export default Iframe;
