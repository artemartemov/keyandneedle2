// import React from 'react';
// import { render, cleanup, waitForElement } from '@testing-library/react';
// import { toHaveAttribute, toBeInTheDocument } from '@testing-library/jest-dom';
// // import 'jest-styled-components';
// import Loader from './Loader';

// afterEach(cleanup);

// expect.extend({ toHaveAttribute, toBeInTheDocument });

// describe('<Loading />', () => {
//   // it('#render() default without props defined', () => {
//   //   const { asFragment } = render(<Loader />);
//   //   expect(asFragment()).toMatchSnapshot();
//   // });

//   it('#render() with a 1000ms delay and check stroke attribute', async () => {
//     const { getByTestId, rerender } = render(<Loader size="48" color="green" delay={1000} />);
//     const delay = await waitForElement(() => getByTestId('spinner'));
//     expect(delay).toBeTruthy();
//     rerender(<Loader color="#000000" size="32" />);
//     expect(delay).toHaveAttribute('stroke', '#000000');
//     expect(delay).toHaveAttribute('height', '32');
//     expect(delay).toMatchSnapshot();
//   });
// });
