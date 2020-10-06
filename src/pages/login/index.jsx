/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Input,
  Button,
  ButtonText,
} from './styles';

import logoImg from '../../assets/logo.png';

const Login = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email) return;
    if (!password) return;

    setLoading(true);

    console.log('submit', email, password);

    try {
      await signIn({
        email,
        password,
      });
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

    </Container>
  );
};

export default Login;
