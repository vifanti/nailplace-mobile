import React from 'react';
import { ViewProps, TouchableOpacityProperties } from 'react-native';

import { Container, Image, Button, ButtonText } from './styles';

interface ButtonProps extends ViewProps, TouchableOpacityProperties {
  children: string;
  selected?: boolean;
  icon: any;
}

const ServiceButtonButtonComponent: React.FC<ButtonProps> = ({
  children,
  selected,
  icon,
  ...rest
}) => (
  <Container selected={selected}>
    <Button {...rest}>
      <Image source={icon} />
      <ButtonText>{children}</ButtonText>
    </Button>
  </Container>
);

export default ServiceButtonButtonComponent;
