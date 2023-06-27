import React from 'react'
import { Sidebar } from '../../../components/organisms/Platform_sidebar/Sidebar'
import styled from 'styled-components';

const Wrapper = styled.section`
    display: flex;
    color: #fff;
`;

export const TestPage = () => {
  return (
    <Wrapper>
        <Sidebar />
        <div>TestPage</div>
    </Wrapper>
  )
}
