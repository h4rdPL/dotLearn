import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import { HomePage } from "./pages/HomePage";
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const App = () => {
  return (
    <>
      <HomePage />
    </>
  );
};
