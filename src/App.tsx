import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import { ThemeProvider } from '~/theme';

const App = () => (
  <ThemeProvider>
    <S.Heading>Restaurants</S.Heading>
  </ThemeProvider>
);

const S = {
  Heading: styled.h1`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.bodyText};
  `,
};

export default hot(module)(App);
