import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 68px;
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
  border: 2px;
  border-color: #000;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #f27983;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #000;
  font-size: 16px;
  font-family: 'Comfortaa-Medium';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
