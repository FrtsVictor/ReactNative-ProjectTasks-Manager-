/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

import {
  InputView,
  InputImg,
  Container,
  ButtonSignUp,
  LogoImage,
  SignUpTxt,
  Input,
  Button,
  ButtonText,
  ImgBackground,
} from './styles';

import background from '../../assets/background.png';
import logoImg from '../../assets/logo.png';
import lockLogin from '../../assets/lockLogin.png';
import accountLogin from '../../assets/account.png';

const Login = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email) return;
    if (!password) return;

    setLoading(true);

    try {
      await signIn({ email, password });
    } catch (error) {
      console.log(error);
      console.log('Username os password invalid.');
    } finally {
      setLoading(false);
    }
  }

  return (

    <ImgBackground source={background}>
      <Container>
        <LogoImage source={logoImg} />

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

        <Button onPress={() => handleSubmit()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ButtonText>Acess</ButtonText>
          ) }
        </Button>

        <ButtonSignUp
          onPress={() => navigation.navigate('SignUp')}
        >
          <SignUpTxt>
            Don't have account? Create your own!
          </SignUpTxt>
        </ButtonSignUp>
      </Container>
    </ImgBackground>
  );
};

export default Login;
