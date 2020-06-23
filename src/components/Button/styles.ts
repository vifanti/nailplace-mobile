import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  white?: boolean;
  margin?: number;
}

type Textprops = ContainerProps;

export const Container = styled.View<ContainerProps>`
  border: 4px;
  border-color: #000;
  border-radius: 10px;

  background: #000;

  ${(props) =>
    props.white &&
    css`
      background: #fff;
    `};

  ${(props) =>
    props.margin &&
    css`
      margin: 5px;
    `}

  width: 100%;
  height: 60px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<Textprops>`
  font-family: 'Comfortaa-Bold';
  font-size: 16px;
  color: #fff;

  ${(props) =>
    props.white &&
    css`
      color: #000;
    `}/* text-transform: uppercase; */
`;
