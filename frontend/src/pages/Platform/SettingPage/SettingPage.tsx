import React from 'react'
import styled from 'styled-components';
import { Sidebar } from '../../../components/organisms/Platform_sidebar/Sidebar';
const Wrapper = styled.section`
    display: flex;
    color: #fff;
`;
export const SettingPage = () => {
  return (
    <Wrapper>
        <Sidebar />
        <div>SettingPage</div>
    </Wrapper>
  )
}
