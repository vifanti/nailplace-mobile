import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px 20px 10px 20px;
`;
export const BackButton = styled(RectButton)`
  margin-top: 40px;
  margin-left: -10px;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 24px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: 'Comfortaa-Medium';
  margin: 10px 0 26px 0;
`;

export const PhoneDDIContainer = styled.View`
  width: 100%;
  height: 68px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
  border: 2px;
  border-color: #000;

  flex-direction: row;
  align-items: center;
`;

export const DDIInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #000;
  font-size: 16px;
  font-family: 'Comfortaa-Medium';
`;

export const Footer = styled.View`
  height: 100px;
  width: 100%;
  padding: 10px 0;

  flex: 1;
  position: relative;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
`;
