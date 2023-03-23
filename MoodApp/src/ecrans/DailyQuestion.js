import React, { useState, useEffect } from 'react';
import {FlatList,TouchableOpacity, Animated, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';


const DailyQuestion = () => {

    const navigation = useNavigation();
    const [history, setHistory] = useState([]);
    const [comment, setComment] = useState('');
    const [isNoteAlreadySavedToday, setIsNoteAlreadySavedToday] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const savedHistory = await AsyncStorage.getItem('MoodHistory');
            if (savedHistory) {
                const sortedHistory = JSON.parse(savedHistory).sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
                });
                setHistory(sortedHistory);
            
                const today = new Date().toISOString().split('T')[0];
                const savedToday = sortedHistory.some((item) => item.date === today);
                setIsNoteAlreadySavedToday(savedToday);
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = async (value) => {
        if (isNoteAlreadySavedToday) {
        alert('Vous avez déjà enregistré une réponse aujourd\'hui.... A demain !');
        return;
        }
    
        const newEntry = {
            date: new Date().toISOString().split('T')[0],
            mood: value,
            comment: comment,
        };

        const updatedHistory = [...history, newEntry].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setHistory(updatedHistory);
        await AsyncStorage.setItem('MoodHistory', JSON.stringify(updatedHistory));
        setComment('');
        setIsNoteAlreadySavedToday(true); 
    };

    const renderHistoryItem = ({ item }) => (
        <HistoryItem>
            {item.date.split('-').reverse().join('/')} : {item.comment && `${item.comment}`} ({item.mood + '/10'})
        </HistoryItem>
    );

    return (

        <Container>
            <HeaderContainer>
                <ButtonBack title="Back" onPress={() => navigation.goBack()} />
            </HeaderContainer>
            <QuestionContainer>
                <QuestionText>Exprimez-vous en quelques mots puis selectionnez une note en de 0 à 10.</QuestionText>
                <CommentInput
                    placeholder="Dites-nous tout..."
                    onChangeText={setComment}
                    value={comment}
                />
                <ButtonContainer>
                    <AnimatedButton color={0} onPress={() => handleButtonClick(0)}>
                        <AnimatedButtonText>0</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={1} onPress={() => handleButtonClick(1)}>
                        <AnimatedButtonText>1</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={2} onPress={() => handleButtonClick(2)}>
                        <AnimatedButtonText>2</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={3} onPress={() => handleButtonClick(3)}>
                        <AnimatedButtonText>3</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={4} onPress={() => handleButtonClick(4)}>
                        <AnimatedButtonText>4</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={5} onPress={() => handleButtonClick(5)}>
                        <AnimatedButtonText>5</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={6} onPress={() => handleButtonClick(6)}>
                        <AnimatedButtonText>6</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={7} onPress={() => handleButtonClick(7)}>
                        <AnimatedButtonText>7</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={8} onPress={() => handleButtonClick(8)}>
                        <AnimatedButtonText>8</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={9} onPress={() => handleButtonClick(9)}>
                        <AnimatedButtonText>9</AnimatedButtonText>
                    </AnimatedButton>
                    <AnimatedButton color={10} onPress={() => handleButtonClick(10)}>
                        <AnimatedButtonText>10</AnimatedButtonText>
                    </AnimatedButton>
                </ButtonContainer>
            </QuestionContainer>
            <QuestionContainer>
            <HistoryTitle>Historique des moods:</HistoryTitle>
                <FlatList
                    data={history}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </QuestionContainer>
        </Container>
    );
};

// ---------------- STYLE CONTAINER ----------------
const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10%;
`;

const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: #fff;
`;

// ---------------- BUTTON BACK A METTRE DANS GLOBAL ----------------
const ButtonBack = styled.Button`
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
`;

// --------------------- CONTAINER QUESTION ---------------------
const QuestionContainer = styled.View`
    background-color: #f2f2f2 ;
    border-radius: 5px;
    padding: 10px;
    margin: 4px;
`;
// ---------------- QUESTION JOURNALIERE ----------------
const QuestionText = styled.Text`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: black;
    font-family: 'palatino';
`;

// ---------------- INPUT POUR DONNER SON MOOD ----------------
const CommentInput = styled.TextInput`
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 20px;
    font-family: 'palatino';
`;

// ---------------- PARTIE BOUTONS DE 1 A 10 ----------------
const ButtonContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 20px;
`;

const AnimatedButton = styled(TouchableOpacity)`
    background-color: ${props => {
        switch(props.color) {
        case 0:
            return 'grey ';
        case 1:
            return '#ff0000';
        case 2:
            return '#ff7f00';
        case 3:
            return '#ffa500';
        case 4:
            return '#ffd700';
        case 5:
            return '#ffff00';
        case 6:
            return 'yellow';
        case 7:
            return '#00ff00';
        case 8:
        case 9:
            return 'green';
        case 10:
            return '#008000';
        default:
            return 'red';
        }
    }};
    padding: 10px 20px;
    border-radius: 50px;
    margin: 5px;
    -webkit-text-stroke: 1px black ;
`;

const AnimatedButtonText = styled(Animated.Text)`
    color: black;
    font-size: 18px;
`;

// ---------------- PARTIE HISTORIQUE DES MOODS ----------------
const HistoryTitle = styled.Text`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: black;
    font-family: 'palatino';
    
`;
const HistoryItem = styled.Text`
    font-size: 16px;
    margin-bottom: 5px;
    font-family: 'palatino';
`;



export default DailyQuestion;
