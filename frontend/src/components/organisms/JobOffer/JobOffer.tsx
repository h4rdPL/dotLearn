import React from "react";
import { Cta } from "../../atoms/Button/Cta";
import { styled } from "styled-components";
import { Paragraph } from "../../atoms/Paragraph/Paragraph";
import { JobInterface } from "../../../interfaces/types";
const JobOfferWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    flex-direction: row;
  }
`;

const SmallParagraph = styled.p`
  color: ${({ theme }) => theme.highlight};
`;
export const JobOffer: React.FC<JobInterface> = ({
  id,
  title,
  salary,
  employmentType,
  location,
  responsibilities,
}) => {
  return (
    <JobOfferWrapper>
      <h2>{title}</h2>
      <InnerWrapper>
        <SmallParagraph>{salary}</SmallParagraph>
        <SmallParagraph>{employmentType}</SmallParagraph>
        <SmallParagraph>{location}</SmallParagraph>
      </InnerWrapper>
      <Paragraph isLight isJobOffer label={responsibilities} />
      <Cta href={`/carrer/${id}`} label="Zobacz więcej" isJobOffer />
    </JobOfferWrapper>
  );
};
