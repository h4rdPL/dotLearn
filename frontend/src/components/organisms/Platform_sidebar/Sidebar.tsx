import React from 'react'
import styled from "styled-components";
import logo from "../../../assets/images/logo.svg"
import icon from "../../../assets/icons/test_icons.svg"
import arrow from "../../../assets/icons/arrowRightIcon.svg"
import { IoIosHome, IoIosRibbon, IoMdBuild, IoIosChatboxes, IoMdClipboard, IoIosLogOut, IoIosBulb } from "react-icons/io";

const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: ${({theme}) => theme.purpleLightSidebar};
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: 25%; 
  }
  a {  
    color: #fff;
    text-decoration: none;
  }
`;

const LogoImage = styled.img`
  padding-top: 2rem;
`;

const ListWrapper = styled.ul`
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  min-width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${({theme}) => theme.background};
  }
`;

const LinkItem = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5rem;
  min-width: 100%;
  padding: 1rem 3rem;
  font-weight: bold;

`;
export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <LogoImage style={{width: "100px"}} src={logo} alt='logo'/>
      <ListWrapper>
        <ListItem>
          <LinkItem href="/platform/dashboard">
          <IoIosHome fill='#fff' style={{fontSize: "2rem"}} />
            Dashboard
          </LinkItem>
        </ListItem>
        <ListItem>
          <LinkItem href="/platform/class">
          <IoIosRibbon fill='#fff' style={{fontSize: "2rem"}} />
            Klasa
          </LinkItem>
        </ListItem>
        <ListItem>
          <LinkItem href="/platform/test">
          <IoMdClipboard fill='#fff' style={{fontSize: "2rem"}} />
            Testy
          </LinkItem>
        </ListItem>
        <ListItem>
          <LinkItem href="/platform/learn">
          <IoIosBulb fill='#fff' style={{fontSize: "2rem"}} />
            Nauka
          </LinkItem>
        </ListItem>
        <ListItem>
          <LinkItem href="/platform/ai">
            <IoIosChatboxes fill='#fff' style={{fontSize: "2rem"}} />
            Rozmowa z AI
          </LinkItem>
        </ListItem>
      </ListWrapper>
      <ListWrapper>
        <ListItem>
        <LinkItem href="/platform/settings">
        <IoMdBuild fill='#fff' style={{fontSize: "2rem"}} />
          Ustawienia
        </LinkItem>
        </ListItem>
        <ListItem>
        <LinkItem href="/">
          <IoIosLogOut fill='#fff' style={{fontSize: "2rem"}} />
          Wyloguj się
        </LinkItem>
        </ListItem>
      </ListWrapper>
    </SidebarWrapper>
    
  )
}
