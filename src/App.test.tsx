import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import App from './App';

export const ensureGridApiHasBeenSet = () => {
  return waitForAsyncCondition(() => {
      return screen.getByTestId('api').innerHTML !== ''
  }, 5)
};

export const waitForAsyncCondition = (condition: () => boolean, maxAttempts: number, attempts=0) => new Promise(function (resolve, reject) {
  (function waitForCondition() {
      // we need to wait for the gridReady event before we can start interacting with the grid
      // in this case we're looking at the api property in our App component, but it could be
      // anything (ie a boolean flag)
      if (condition()) {
          // once our condition has been met we can start the tests
          return resolve(null);
      }
      attempts++;

      if(attempts >= maxAttempts) {
          reject("Max timeout waiting for condition")
      }

      // not set - wait a bit longer
      setTimeout(waitForCondition, 10);
  })();
});

describe('test', () => {
  let {container}: RenderResult = render(<App />);

  beforeAll((done) => {
    ensureGridApiHasBeenSet().then(() => done(), () => done(new Error("Grid API not set within expected time limits")));
  })

  // afterEach(() => {
  //   unmount();
  // })

  it('all rows selected', () => {
    let selectAllButton = screen.getByTestId('selectAll');
    fireEvent.click(selectAllButton);
    let selectedNodes = container.querySelectorAll('.ag-center-cols-container .ag-row-selected');
    expect(selectedNodes.length).toBe(3);
  });

  // it('all rows deselected', () => {
  //   let deselectAllButton = screen.getByTestId('deselectAll');
  //   fireEvent.click(deselectAllButton);
  //   let selectedNodes = container.querySelectorAll('.ag-center-cols-container .ag-row-selected');
  //   expect(selectedNodes.length).toBe(0);
  // });
})