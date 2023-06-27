import React from 'react'
import { Sidebar } from '../../../components/organisms/Platform_sidebar/Sidebar'
import styled from 'styled-components';

const Wrapper = styled.section`
    display: flex;
    color: #fff;
`;

export const AIPage = () => {
  return (
    <Wrapper>
        <Sidebar />
        <div>AIPage</div>
    </Wrapper>
  )
}
