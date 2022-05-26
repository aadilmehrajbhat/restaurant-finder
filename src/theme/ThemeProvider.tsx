import { FC, ReactNode } from 'react';
import { ThemeProvider as Provider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './GlobalStyle';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <Provider theme={theme}>
    <GlobalStyle />
    {children}
  </Provider>
);

export default ThemeProvider;
