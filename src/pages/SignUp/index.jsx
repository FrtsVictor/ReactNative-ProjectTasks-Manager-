import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';

import {
  Container,
  WelcomeImage,
  Input,
  Button,
  ButtonText,
  AccountMessage,
  GoBackTxt,
  ImgBackground,
  InputView,
  InputImg,
} from './styles';

// imgs
import background from '../../assets/background.png';
import lockLogin from '../../assets/lockLogin.png';
import accountLogin from '../../assets/account.png';
import signUpImg from '../../assets/createaccount2.png';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountMessage, setAccountMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function createAccount() {
    if (!email || !password) {
      setAccountMessage('User or Password invalid');
      return;
    }

    setLoading(true);

    const response = await api.post('users', {
      email,
      password,
    }).then(() => {
      setPassword('');
      setEmail('');
      setAccountMessage('Account created Sucessfull');
      return response;
    }).catch((error) => {
      setAccountMessage('Internal Server Error sorry :( ');
      console.log(error);
    })
      .finally(setLoading(false));
  }

  useEffect(() => {
    setAccountMessage('');
  }, []);

  return (
    <ImgBackground source={background}>

      <AntDesign.Button
        name="left"
        backgroundColor="#F0F0F5"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      >
        <GoBackTxt>Go back</GoBackTxt>
      </AntDesign.Button>

      <Container>

        <WelcomeImage source={signUpImg} />

        <InputView>
          <InputImg source={accountLogin} />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Login"
            underlineColorAndroid="transparent"
          />
        </InputView>

        <InputView>
          <InputImg source={lockLogin} />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
            underlineColorAndroid="transparent"
          />
        </InputView>

        {accountMessage !== '' ? (
          <AccountMessage>{accountMessage}</AccountMessage>
        ) : (
          null
        )}

        <Button onPress={() => createAccount()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ButtonText>Create</ButtonText>
          ) }
        </Button>

      </Container>
    </ImgBackground>
  );
};

export default SignUp;
