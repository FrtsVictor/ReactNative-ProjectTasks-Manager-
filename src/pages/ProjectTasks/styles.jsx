/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const Title = styled.Text`
color: #3a3a3a;
font-size:36px;
padding: 20px 0;
`;

export const ButtonTxt = styled.Text`
color: #FFF;
font-size: 18px;
font-weight:bold;

`;

export const FormAddNewProject = styled.View`
flex-direction: row;
`;

export const Projects = styled.View`
flex:1;
margin-top:30px;
`;

export const Project = styled.View`
background-color: #f2feff;
margin-bottom:10px;
border-radius:5px;
padding: 10px 20px;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const ProjectTxt = styled.Text`
font-size: 16px;
color: #000;
`;

export const ProjectActions = styled.View`
flex-direction: row;
padding-left: 15px;
`;

export const ButtonDell = styled.TouchableOpacity`
`;

export const ButtonCheck = styled.TouchableOpacity`
color: red;

`;

export const ErrorMessage = styled.Text`
  color: #c53030;
  font-size: 14px;
  margin-top: 5px;
`;
