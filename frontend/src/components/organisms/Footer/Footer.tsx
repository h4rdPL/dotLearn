import React from "react";
import styled from "styled-components";
import { Paragraph } from "../../atoms/Paragraph/Paragraph";
const FooterWrapper = styled.footer`
  padding: 1rem 0;
`;
export const Footer = () => {
  return (
    <FooterWrapper>
      <Paragraph isLight={false} label="Made with 💜 by h4rdPL" />
    </FooterWrapper>
  );
};
