import React from "react";
import styled from "styled-components";

interface LinkProps {
    label: string;
}

const NavbarLink = styled.a`
    color: ${({ theme }) => theme.black};
`;
export const Link = ({ label }: LinkProps) => {
    return (
        <NavbarLink>
            {label}
        </NavbarLink>
    )
}