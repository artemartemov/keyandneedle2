import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlideContainer = styled.div`
  transition: opacity 2s ease-in-out;

  /* Sets the gatby image wrapper to be viewport height */
  & .gatsby-image-wrapper {
    height: 100vh;
  }
`;

const Slider = styled.div`
  z-index: -1000;
  height: 100vh;
  width: 100vw;
  padding: env(safe-area-inset);
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  & ${SlideContainer} {
    width: 100vw;
    display: inline-block;
    transition: transform 0.2s ease-in-out;
    transform: translate3d(${props => props.currentIndex * -100}%, 0, 0);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const requestTimeout = (fn, delay) => {
  if (typeof window !== `undefined`) {
    if (!window.requestAnimationFrame) return setTimeout(fn, delay);

    const start = new Date().getTime();
    const handle = {};
    const loop = () => {
      const current = new Date().getTime();
      const delta = current - start;

      // eslint-disable-next-line no-unused-expressions
      delta >= delay ? fn.call() : handle.value === window.requestAnimationFrame(loop);
    };

    handle.value = window.requestAnimationFrame(loop);

    return handle;
  }
};

class BgImageSlider extends PureComponent {
  constructor({ imageSlides }) {
    super();
    this.state = {
      currentIndex: 0,
      lastSlide: imageSlides.length - 1,
    };
  }

  // Checks to see if the current image is the
  // last image so that it can go to the first slide, otherwise
  // update the currentIndex

  // This function will be called with a timer to run every x amount
  // of seconds.
  goToNextSlide = () => {
    const { currentIndex, lastSlide } = this.state;

    if (currentIndex === lastSlide) {
      return this.setState({
        currentIndex: 0,
      });
    }
    // update the currentIndex
    return this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
    }));
  };

  // This function renders out the slides. It contains a map of the images
  // from the array. Then it sets an isActive class based on the current
  // position. At the end there is a timer that will run goToNextSlide after
  // 10 seconds
  renderSlides = () => {
    const { currentIndex } = this.state;
    const { imageSlides } = this.props;

    const slides = imageSlides.map((image, i, alt) => {
      // If the current slide matches the active slide, set an isActive prop
      const isActive = currentIndex === i;

      return (
        // Each item requires a unique key. Also we are controling the opactiy prop from
        // styled components in the first few lines of the document
        <SlideContainer isActive={isActive} key={image.asset._id}>
          <Img fluid={image.asset.fluid} alt={image.alt} />
        </SlideContainer>
      );
    });

    // Runs the goToNextSlide function every 10 seconds
    // setTimeout(this.goToNextSlide, 3000);

    return slides;
  };

  render() {
    const { currentIndex } = this.state;
    requestTimeout(this.goToNextSlide, 7500);
    // display the renderSlides function within a Slider styled-component
    return <Slider currentIndex={currentIndex}>{this.renderSlides()}</Slider>;
  }
}

BgImageSlider.propTypes = {
  imageSlides: PropTypes.array,
};

BgImageSlider.defaultProps = {
  imageSlides: [],
};

export default BgImageSlider;
