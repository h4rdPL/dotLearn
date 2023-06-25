import React, { useState } from "react";
import styled from "styled-components";
import { CheckboxProps } from "../../../interfaces/types";
const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  align-self: flex-end;
  cursor: pointer;
`;

const CustomCheckbox = styled.span<CheckboxProps>`
  min-width: 16px;
  min-height: 16px;
  border: 2px solid ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.white};
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.white : "transparent"};
  margin-right: 8px;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  isChecked,
  onChange,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(id, !isChecked);
    }
  };
  return (
    <>
      <CheckboxWrapper onClick={handleChange}>
        <CustomCheckbox isChecked={isChecked} />
        <Label onClick={handleChange}>{label}</Label>
      </CheckboxWrapper>
    </>
  );
};
