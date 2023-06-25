import React from "react";
import { ItemInterface } from "../../../interfaces/types";
import { styled } from "styled-components";
import circleItem from "../../../assets/icons/itemCircle.svg";
export const Item: React.FC<ItemInterface> = ({ label }) => {
  const ListItem = styled.li`
    list-style-type: none;
    padding-left: 20px; /* Adjust the padding as needed */
    list-style-image: url(${circleItem});
  `;

  return <ListItem>{label}</ListItem>;
};
