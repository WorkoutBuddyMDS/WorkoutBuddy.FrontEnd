import * as React from 'react';
import NavigationLayout from '../src/components/Layouts/NavigationLayout';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../src/store';
import '@testing-library/jest-dom';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  isFallback: false,
}));

describe('Tests', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <ForwardRefWrapper />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('expects correct text to be displayed', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ForwardRefWrapper />
      </Provider>
    );

    expect(getByText('test')).toBeInTheDocument();
  });
});

const ForwardRefWrapper = React.forwardRef((props, ref) => (
  <NavigationLayout ref={ref} {...props}>
    <div className="default-child-text">test</div>
  </NavigationLayout>
));
