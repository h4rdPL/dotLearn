import React from 'react'
import { Sidebar } from '../../../components/organisms/Platform_sidebar/Sidebar'
import styled from 'styled-components';
const Wrapper = styled.section`
    display: flex;
    color: #fff;
`;
export const ClassPage = () => {
  return (
    <Wrapper>
        <Sidebar />
        <div>ClassPage</div>
    </Wrapper>
  )
}
