import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Image = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 48px;
  color: #000;
  font-family: 'Comfortaa-Medium';
`;

export const Footer = styled.View`
  height: 100px;
  width: 100%;

  padding: 0 14px;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
