import React from "react";
import { Information } from "../../molecules/Information/Information";
import testImages from "../../../assets/images/testImages.svg";
import notesBackground from "../../../assets/images/notesBackground.svg";
import { css, styled } from "styled-components";
import { InformationProps } from "../../../interfaces/types";

const Image = styled.img`
  max-width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
  }
`;

const Wrapper = styled.div<InformationProps>`
  min-width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.desktopPadding};
    flex-direction: row;
    ${({ secondary }) =>
      secondary &&
      css`
        flex-direction: row-reverse;
      `};
  }
`;
export const InformationWrapper = ({
  firstLabel,
  secondLabel,
  thirdLabel,
  description,
  secondary,
}: InformationProps) => {
  return (
    <>
      <Wrapper secondary={secondary}>
        <Image
          src={secondary ? notesBackground : testImages}
          alt={secondary ? "notesImages" : "testImages"}
        />
        <Information
          firstLabel={firstLabel}
          secondLabel={secondLabel}
          thirdLabel={thirdLabel}
          description={description}
        />
      </Wrapper>
    </>
  );
};
