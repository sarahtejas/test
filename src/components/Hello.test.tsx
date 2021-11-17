import * as React from 'react';
import { render } from '@testing-library/react';
import Hello from './Hello';

describe('<Hello />', () => {
  it('displays "Hello, World!', () => {
    const { getByTestId } = render(<Hello />);
    expect(getByTestId('hello').textContent).toEqual('Hello, World!');
  });
});
