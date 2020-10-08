/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ButtonSignUp,
  Image,
  SignUpTxt,
  Input,
  Button,
  ButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

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
    <Container>
      <Image source={logoImg} />

      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Login"
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      />

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
  );
};

export default Login;
