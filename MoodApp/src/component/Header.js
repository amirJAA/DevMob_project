import React from 'react';
import styled from 'styled-components/native';


const Header = () => {
    return (
        <HeaderContainer>
        <HeaderTitle>MoodApp</HeaderTitle>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.View`
    height: 60px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: black;
    font-family: palatino;
`;


export default Header;
