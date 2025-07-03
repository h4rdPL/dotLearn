import React from "react";
import styled, { css } from "styled-components";
import { Paragraph } from "../../atoms/Paragraph/Paragraph";
import { Heading } from "../../atoms/Heading/Heading";
import { SecondaryHeading } from "../../atoms/Heading/SecondaryHeading";
import { MissionProps } from "../../../interfaces/types";

const MissionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 1rem;
  justify-content: center;
  text-align: left;
`;

const IconWrapper = styled.span`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.purpleLight};
`;
const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

export const Mission: React.FC<MissionProps> = ({
  heading,
  label,
  icon,
  secondary,
}) => {
  return (
    <MissionWrapper>
      <IconWrapper>
        <Icon src={icon} />
      </IconWrapper>
      <SecondaryHeading secondary={true} label={heading} />
      <Paragraph isLight={true} label={label} />
    </MissionWrapper>
  );
};
