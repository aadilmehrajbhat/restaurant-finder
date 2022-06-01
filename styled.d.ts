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
      greyLight: string;
    };

    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
  }
}
