import React from "react";
import styled from "styled-components";
import { Mission } from "../../molecules/Mission/Mission";
import reliability from "../../../assets/icons/diamond.svg";
import safety from "../../../assets/icons/safety.svg";
import thunder from "../../../assets/icons/thunder.svg";
import arrowCorrect from "../../../assets/icons/arrowCorrect.svg";

const MissionContainer = styled.div`
  display: grid;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MissionWrapper = () => {
  return (
    <MissionContainer>
      <Mission
        icon={reliability}
        secondary={true}
        heading="Niezawodność"
        label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      />
      <Mission
        icon={safety}
        secondary={true}
        heading="Bezpieczeństwo"
        label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      />
      <Mission
        icon={thunder}
        secondary={true}
        heading="Nowoczesność"
        label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      />

      <Mission
        secondary={true}
        icon={arrowCorrect}
        heading="Dostępność"
        label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      />
    </MissionContainer>
  );
};
