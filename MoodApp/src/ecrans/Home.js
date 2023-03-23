import React from 'react';
import styled from 'styled-components/native';
import Header from '../component/Header';
import { Image } from 'react-native';


const Home = (props) => {
    const handleNavigation = (page) => {
        props.navigation.navigate(page);
    };

    return (
        <Container>
            <Header/>
            <ImageContainer>
                <Image
                    source={require('../config/assets/home.jpeg')}
                />
            </ImageContainer>
            <Content>
                <StyledHeader>Bienvenue sur notre application</StyledHeader>
                <StyledText>Prenez soin de votre santé mentale en répondant à nos questions quotidiennes et en suivant votre historique de mood.</StyledText>
                <StyledButton onPress={() => handleNavigation('DailyQuestion')}>
                    <StyledButtonText>Commencer le test</StyledButtonText>
                </StyledButton>

            </Content>
        </Container>
    );
};


// ---------------- STYLE CONTAINER ----------------
const Container = styled.View`
    flex: 1;
    background-color: #f2f2f2;
`;

const ImageContainer = styled.View`
    align-items: center;
    margin-top: 20px;
`;

const Content = styled.View`
    flex: 1;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    margin: 3px;
`;

// ---------------- STYLE HEADER + INTRO ----------------
const StyledHeader = styled.Text`
    font-size: 24px;
    color: black ;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    font-family: 'palatino';
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: #333333;
    text-align: center;
    margin-bottom: 20px;
    font-family: 'palatino';
`;

// ---------------- STYLE BOUTONS NAV ----------------
const StyledButton = styled.TouchableOpacity`
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 20px;
`;

const StyledButtonText = styled.Text`
    color: #ff6e7f;
    font-size: 18px;
    font-weight: bold;
    font-family: 'palatino';
`;

export default Home;
