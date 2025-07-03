import React, { useState } from "react";
import { css, styled } from "styled-components";
import logo from "../../../assets/images/logo.svg";
import hamburger from "../../../assets/icons/hamburger.svg";
import { Button } from "../../atoms/Button/Button";
import { MenuProps } from "../../../interfaces/types";
import { Link } from "react-router-dom";
import { Link as MyLink } from "../../atoms/Links/Link";
const SidebarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 999;
  background-color: ${({ theme }) => theme.background};
  padding: ${({ theme }) => theme.padding.mobilePadding};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: ${({ theme }) => theme.padding.desktopPadding};
  }
`;

const Logo = styled.img`
  max-height: 40px;
`;

const Hamburger = styled.img`
  max-width: 100%;
  height: 40px;
  cursor: pointer;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    display: none;
  }
`;

const NavWrapper = styled.div<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  color: ${({ theme }) => theme.black};
  padding: 0 1rem;
  border-radius: 5px;
  transform: translateX(100%);
  transition: transform 0.39s ease-in-out;
  z-index: 99;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    position: relative;
    flex-direction: row;
    transform: translateX(0);
    align-items: center;
    width: fit-content;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      transform: translateX(0);
    `}
`;
const MenuWrapper = styled.ul`
  text-align: center;
  min-width: 100%;
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.background};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    position: relative;
    display: flex;
    gap: 2rem;
    align-items: center;
    width: auto;
  }
`;
const ListItem = styled.li`
  width: 100%;
  padding: 0.6rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: fit-content;
    padding: 0;
  }
`;

export const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <SidebarWrapper>
        <Logo src={logo} />
        <Hamburger onClick={handleClick} src={hamburger} />
        <NavWrapper isActive={isActive}>
          <MenuWrapper>
            <ListItem>
              <Link to={"/"}>
                <MyLink label="Strona główna" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/about"}>
                <MyLink label="O nas" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/carrer"}>
                <MyLink label="Kariera" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/contact"}>
                <MyLink label="Kontakt" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to={"/login"}>
                <Button label="Dołącz!" />
              </Link>
            </ListItem>
          </MenuWrapper>
        </NavWrapper>
      </SidebarWrapper>
    </>
  );
};
