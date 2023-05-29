import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&family=Source+Sans+Pro:wght@400;600&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
}

body {
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.background};

}

img {
    max-width: 100%;
}
button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
  }
  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
