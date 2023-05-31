import * as React from 'react';
import renderer from 'react-test-renderer';
import NavigationLayout from '../components/Layouts/NavigationLayout';
import { Provider } from 'react-redux';
import { screen, render } from '@testing-library/react';
import store from '../store';
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

const ForwardRefWrapper = React.forwardRef((props, ref) => (
  <NavigationLayout {...props} for={ref}>
    <div className="default-child-text">test</div>
  </NavigationLayout>
));

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <ForwardRefWrapper />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('expects correct text to be displayed', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <ForwardRefWrapper />
    </Provider>
  );

  expect(getByText('test')).toBeInTheDocument();
});
