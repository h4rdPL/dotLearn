import React from "react";
import { styled } from "styled-components";
import { InputProps } from "../../../interfaces/types";

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 7px;

  &::placeholder {
    color: #000;
  }
`;

export const Input: React.FC<InputProps> = ({
  placeholder,
  style,
  isFileType,
}) => {
  const inputType = isFileType ? "file" : "text";

  return <FormInput style={style} placeholder={placeholder} type={inputType} />;
};
