import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
      --base-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      padding: 0;
      margin: 0;
      font-family: var(--base-font)
    }
  `;
