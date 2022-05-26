import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      primaryText: string;
      secondary: string;
      secondaryText: string;
      body: string;
      bodyText: string;
    };
  }
}
