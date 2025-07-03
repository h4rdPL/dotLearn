import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import "flowbite/src/themes/default";
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
  a {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    color: ${({ theme }) => theme.white};
  }
`;

export default GlobalStyle;
