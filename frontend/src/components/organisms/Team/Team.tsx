import React from "react";
import people from "../../../assets/images/employeeImage.png";
import { styled } from "styled-components";
import { SecondaryHeading } from "../../atoms/Heading/SecondaryHeading";
import { Button } from "../../atoms/Button/Button";
const TeamWrapper = styled.div`
  display: flex;

  flex-direction: column;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Span = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
  }
`;
export const Team = () => {
  return (
    <TeamWrapper>
      <Span>
        <InnerWrapper>
          <img src={people} />
          <SecondaryHeading label="CEO & CO-FUNDER" secondary isSmall />
        </InnerWrapper>
        <InnerWrapper>
          <img src={people} />
          <SecondaryHeading label="FULLSTACK DEVELOPER" secondary isSmall />
        </InnerWrapper>
        <InnerWrapper>
          <img src={people} />
          <SecondaryHeading label="GRAPHIC DESIGNER" secondary isSmall />
        </InnerWrapper>
      </Span>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Button secondary label="Sprawdź oferty" />
      </span>
    </TeamWrapper>
  );
};
