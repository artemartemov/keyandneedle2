import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { toHaveTextContent } from '@testing-library/jest-dom';
import 'jest-styled-components';
import Modal, { ModalWrapper } from './Modal';

afterEach(cleanup);

expect.extend({ toHaveTextContent });

const modal = <Modal title="Who is a modal?">I am a modal</Modal>;

describe('<Modal />', () => {
  it('#render() ModalWrapper centered', () => {
    const { container } = render(<ModalWrapper centered />);
    expect(container.firstChild).toHaveStyleRule('transform', 'translate(-50%,-50%)');
    expect(container.firstChild).toHaveStyleRule('top', '50%');
    expect(container.firstChild).toMatchSnapshot();
  });

  it('#render() is it a sidepanel?', () => {
    const { baseElement, getByTestId } = render(
      <Modal title="Who is a modal?" isSidePanel>
        I am a modal
      </Modal>
    );
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('position', 'fixed');
    expect(getByTestId('modal-wrapper')).toHaveStyleRule('top', '0');
    expect(baseElement).toMatchSnapshot();
  });

  it('#render() default without props defined', () => {
    const { baseElement, getByTestId } = render(modal);
    expect(getByTestId('modal-header')).toHaveTextContent('Who is a modal?');
    expect(baseElement).toHaveTextContent('I am a modal');
    expect(baseElement).toMatchSnapshot();
  });
});
