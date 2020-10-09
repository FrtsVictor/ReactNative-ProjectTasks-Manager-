import styled from 'styled-components/native';

export const Container = styled.View`
flex : 1;
justify-content: center;
align-items:center;
`;

export const Button = styled.TouchableOpacity`
width: 290px;
height: 40px;
margin-top: 40px;
background-color: #4342FB;
border-radius: 5px;
align-items: center;
justify-content: center;
width: 170px;
`;

export const ButtonText = styled.Text`
color: #fff;
font-size: 18px;
font-weight: bold;
`;

export const WelcomeImage = styled.Image`
max-width: 360px;
max-height: 180px;
margin-bottom: 20px;
`;

export const AccountMessage = styled.Text`
  font-size: 14px;
  margin-top: 8px;
  color: #000;
`;

export const GoBackTxt = styled.Text`
font-size: 15px;
`;

export const ImgBackground = styled.ImageBackground`
flex: 1;
`;

export const InputView = styled.View`
flex-direction: row;
justify-content: flex-start;
align-items: center;
background-color: #e6f0ff;
height: 45px;
width: 290px;
border-radius: 15px;
margin: 10px;
`;

export const InputImg = styled.Image`
padding: 10px;
margin: 5px 5px 5px 15px;
height: 26px;
width: 23px;
align-items: center;
opacity: 0.5;
`;

export const Input = styled.TextInput`
flex:1;
margin-left: 10px;
`;
