/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
padding: 0 20px;
`;

export const Title = styled.Text`
color: #3a3a3a;
font-size:36px;
`;

export const TaskView = styled.View`
 flex:1;
 padding: 20px;
`;

export const TaskText = styled.Text`
font-size: 22px;
color: #3a3a3a;
margin-bottom: 20px;

`;

export const TaskBoldP = styled.Text`
font-size: 20px;
font-weight: bold;
`;

export const TaskP = styled.Text`
font-size: 20px;
color: #3a3a3a;
`;

export const LogoutBtn = styled.TouchableOpacity`
width:100px;
height:40px;
margin-top: 40px;
border-radius: 5px;
background-color: #000;
align-items : center;
justify-content: center;
`;

export const LogoutBtnTxt = styled.Text`
color: #FFF;
font-size: 18px;
font-weight: bold;
`;
