import React from "react";
import { styled } from "styled-components";
import { InputProps } from "../../../interfaces/types";

export const Placeholder: React.FC<InputProps> = ({ placeholder }) => {
  const Textarea = styled.textarea`
    width: 100%;
    min-height: 200px;
    padding: 1rem;
    border-radius: 7px;
    &::placeholder {
      color: ${({ theme }) => theme.black};
    }
  `;
  return (
    <>
      <Textarea placeholder={placeholder} />
    </>
  );
};
