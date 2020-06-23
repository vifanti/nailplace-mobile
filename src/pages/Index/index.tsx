import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';

import backgroundImg from '../../assets/background.png';

import { Container, Title, Image, Footer } from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Image source={backgroundImg}>
        <Title>Nail Place</Title>
      </Image>
      <Footer>
        <Button white margin={5} onPress={() => navigation.navigate('SignUp')}>
          Registrar
        </Button>
        <Button margin={5} onPress={() => navigation.navigate('SignIn')}>
          Entrar
        </Button>
      </Footer>
    </Container>
  );
};

export default SignIn;
