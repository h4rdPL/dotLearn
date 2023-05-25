import React from "react";
import { Information } from "../../molecules/Information/Information";
import testImages from "../../../assets/images/testImages.svg"
import { css, styled } from "styled-components";
import { InformationProps } from "../../../interfaces/types";

const Image = styled.img`
    max-width: 100%;
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
        max-width: 30%;
    }
`;

const Wrapper = styled.div<InformationProps>`
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 4rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
        flex-direction: row;

        ${({ secondary }) => secondary && css`
        flex-direction: row-reverse;
    `};
    }
`;

export const InformationWrapper = ({ firstLabel, secondLabel, thirdLabel, description, secondary }: InformationProps) => {
    return (
        <>
            <Wrapper secondary={secondary}>
                <Image src={testImages} alt="test" />
                <Information firstLabel={firstLabel} secondLabel={secondLabel} thirdLabel={thirdLabel} description={description} />
            </Wrapper>
        </>
    )
}