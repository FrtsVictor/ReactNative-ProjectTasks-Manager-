/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
padding: 0 20px;
`;

export const Title = styled.Text`
color: #3a3a3a;
font-size:36px;
padding: 20px 0;
`;

export const Tasks = styled.View`
flex:1;
margin-top:30px;
`;

export const Task = styled.View`
background-color: #fff;
margin-bottom:10px;
border-radius:5px;
padding: 10px 20px;
flex-direction: row;
justify-content: space-between;
`;

export const Text = styled.Text`
font-size: 16px;
font-weight: 600;
color: #3a3a3a;
`;
