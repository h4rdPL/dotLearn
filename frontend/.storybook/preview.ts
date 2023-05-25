import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "../src/theme/myTheme";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&family=Source+Sans+Pro:wght@400;600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: ${({ theme }) => theme.background};
    overflow-x: hidden;
  }
  button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
  }
  ul {
    list-style: none;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
    themes: { theme },
    GlobalStyles,
    Provider: ThemeProvider,
  }),
];

export default preview;
