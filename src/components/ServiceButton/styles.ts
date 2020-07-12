import styled, { css } from 'styled-components/native';

interface ContainerProps {
  selected?: boolean;
}

type Textprops = ContainerProps;

export const Container = styled.View<ContainerProps>`
  border: 2px;
  border-color: #f27983;
  border-radius: 8px;

  background: #fff;

  ${(props) =>
    props.selected &&
    css`
      background: #f2b3ca;
    `};

  height: 120px;
  width: 120px;
  margin: 8px;
  padding-top: 0px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  margin-bottom: 16px;
  width: 40px;
  height: 40px;
`;

export const ButtonText = styled.Text<Textprops>`
  font-family: 'Comfortaa-Bold';
  font-size: 14px;
  color: #000;
`;
