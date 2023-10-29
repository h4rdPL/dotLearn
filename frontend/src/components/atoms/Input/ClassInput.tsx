import React from "react";
import { styled } from "styled-components";
import { InputProps } from "../../../interfaces/types";

const ClassInputStyle = styled.input`
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-bottom: 1rem;
  width: 50%;

  &::placeholder {
    color: #ffffff99;
  }
`;

export const ClassInput: React.FC<InputProps> = ({
  placeholder,
  style,
  name,
  onChange,
}) => {
  return (
    <ClassInputStyle
      onChange={onChange}
      style={style}
      placeholder={placeholder}
      name={name}
    />
  );
};
