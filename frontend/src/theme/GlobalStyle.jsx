import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: palegoldenrod;
}

img {
    width: 100%;
}
button {
    cursor: pointer;
}
`;

export default GlobalStyle;
