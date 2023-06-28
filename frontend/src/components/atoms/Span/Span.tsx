import React from "react";
import styled from "styled-components";
import { SpanInterface } from "../../../interfaces/types";

const SpanWrapper = styled.span`
  color: ${({ theme }) => theme.yellowBright};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h3``;

const GradeWrapper = styled.span`
  background-color: ${({ theme }) => theme.purple};
  padding: 1rem;
  border-radius: 10px;
  align-self: flex-end;
`;
export const Span: React.FC<SpanInterface> = ({
  gradeLabel,
  titleLabel,
  label,
  isGrade,
}) => {
  return (
    <Wrapper>
      <Title>{titleLabel}</Title>
      <SpanWrapper>{label}</SpanWrapper>

      {isGrade ? <GradeWrapper>{gradeLabel}</GradeWrapper> : ""}
    </Wrapper>
  );
};
