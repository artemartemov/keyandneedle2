import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isBrowser } from 'utils';
import SliderContent from './SliderContent';
import Slide from './Slide';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

const StyledSlider = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
  top: 0;
  left: 0;
  z-index: -1;

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

const getWidth = () => isBrowser() && window.innerWidth;

/**
 * @function Slider
 */
const Slider = props => {
  const { slides } = props;

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    imageWidth: 800,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { activeSlide, translate, _slides, transition, imageWidth } = state;

  const autoPlayRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const smooth = e => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const transitionEnd = window.addEventListener('transitionend', smooth);
    const onResize = window.addEventListener('resize', resize);

    let interval = null;

    if (props.autoPlay) {
      interval = setInterval(play, props.autoPlay * 1000);
    }

    return () => {
      window.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);

      if (props.autoPlay) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 });
  }, [transition]);

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0, imageWidth: getWidth() });
  };

  const smoothTransition = () => {
    // eslint-disable-next-line no-shadow
    let _slides = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1) _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth(),
      imageWidth: getWidth(),
    });
  };

  const nextSlide = () =>
    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });

  return (
    <StyledSlider>
      <SliderContent translate={translate} transition={transition} width={getWidth() * _slides.length}>
        {_slides.map(_slide => (
          <Slide
            width={getWidth()}
            key={_slide.asset.assetId}
            content={imageUrlFor(buildImageObj(_slide))
              .width(imageWidth)
              .maxWidth(1800)
              .quality(100)
              .fit('scale')
              .url()}
          />
        ))}
      </SliderContent>
    </StyledSlider>
  );
};

Slider.propTypes = {
  slides: PropTypes.array,
  autoPlay: PropTypes.number,
};

Slider.defaultProps = {
  slides: [],
  autoPlay: null,
};

export default Slider;
