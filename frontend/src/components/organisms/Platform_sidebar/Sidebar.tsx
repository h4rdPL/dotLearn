import styled from "styled-components";
import {
  IoIosHome,
  IoIosRibbon,
  IoMdBuild,
  IoIosChatboxes,
  IoMdClipboard,
  IoIosLogOut,
  IoIosBulb,
} from "react-icons/io";
import { Link } from "react-router-dom";

const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.purpleLightSidebar};

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const ListWrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  min-width: 100%;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 0 1rem;
  }
`;

const LinkItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  min-width: 100%;
  padding: 1rem 2rem;
`;
export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <ListWrapper>
        <Link to="/platform/dashboard">
          <ListItem>
            <LinkItem>
              <IoIosHome fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/platform/class">
          <ListItem>
            <LinkItem>
              <IoIosRibbon fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/platform/test">
          <ListItem>
            <LinkItem>
              <IoMdClipboard fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/platform/learn">
          <ListItem>
            <LinkItem>
              <IoIosBulb fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/platform/ai">
          <ListItem>
            <LinkItem>
              <IoIosChatboxes fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/platform/settings">
          <ListItem>
            <LinkItem>
              <IoMdBuild fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem>
            <LinkItem>
              <IoIosLogOut fill="#fff" style={{ fontSize: "2rem" }} />
            </LinkItem>
          </ListItem>
        </Link>
      </ListWrapper>
    </SidebarWrapper>
  );
};
