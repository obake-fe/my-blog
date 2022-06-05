import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@config/theme';
import renderer from 'react-test-renderer';
import { Header } from '@components/index';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Header title="Default Starter" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
