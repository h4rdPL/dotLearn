import React from "react";
import { Sidebar } from "../components/organisms/Platform_sidebar/Sidebar";
import styled from "styled-components";
const Wrapper = styled.section`
  color: #fff;
`;

const InnerWrapper = styled.div`
  padding: 2rem;
`;
export const PlatformLayout = ({ children }: any) => {
  return (
    <Wrapper>
      <Sidebar />
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
