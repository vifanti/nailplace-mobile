import React, { useRef, useCallback } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import CountryFlag from 'react-native-country-flag';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackButton,
  Footer,
  PhoneDDIContainer,
  DDIInput,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const cpfInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const confirmEmailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  interface SignUpFormData {
    name: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const phoneRegExp = /\d{2}\9\d{8}/g;

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .max(14, 'No máximo 14 dígitos'),
          phoneNumber: Yup.string()
            .required('Número obrigatório')
            .matches(phoneRegExp, 'O número não é válidp'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email válido'),
          confirmEmail: Yup.string()
            .required('Confirme o e-mail')
            .email('Digite um email válido')
            .oneOf([Yup.ref('email'), null], 'Os e-mails devem ser iguais'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPassword: Yup.string()
            .min(6, 'No mínimo 6 dígitos')
            .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log({
          ...data,
          phoneNumber: `+55${data.phoneNumber}`,
        });

        await api.post('/users', {
          ...data,
          phoneNumber: `+55${data.phoneNumber}`,
        });

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer o cadastro. Tente novamente',
        );
      }
    },
    [navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="corner-up-left" size={24} />
          </BackButton>

          <View>
            <Title>Registrar</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                cpfInputRef.current?.focus();
              }}
            />

            <Input
              ref={cpfInputRef}
              keyboardType="number-pad"
              name="cpf"
              icon="credit-card"
              placeholder="CPF"
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneNumberInputRef.current?.focus();
              }}
            />

            <PhoneDDIContainer>
              <CountryFlag isoCode="br" size={14} style={{ marginRight: 16 }} />
              <DDIInput value="+55" editable={false} />
            </PhoneDDIContainer>

            <Input
              ref={phoneNumberInputRef}
              keyboardType="number-pad"
              name="phoneNumber"
              icon="phone"
              placeholder="Celular"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmEmailInputRef.current?.focus();
              }}
            />

            <Input
              ref={confirmEmailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="confirmEmail"
              icon="mail"
              placeholder="Confirme o e-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordInputRef.current?.focus();
              }}
            />

            <Input
              ref={confirmPasswordInputRef}
              secureTextEntry
              textContentType="newPassword"
              name="confirmPassword"
              icon="lock"
              placeholder="Confirme a senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
          <Footer>
            <Button onPress={() => formRef.current?.submitForm()}>
              Próximo
            </Button>
          </Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
