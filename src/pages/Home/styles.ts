import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Service } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  available: boolean;
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
  border: 2px;
  border-color: red;
  margin-bottom: ${getBottomSpace()}px;
`;

export const BackButton = styled(RectButton)`
  margin-top: 40px;
  margin-left: 10px;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Comfortaa-Medium';
  margin: 10px 0 26px 0;
  margin-left: 20px;
`;

export const MapContainer = styled.View`
  flex: 1;
  /* width: 100%; */
  overflow: hidden;
  margin-top: 16px;
`;

export const MapMarkerContainer = styled.View`
  width: 90px;
  height: 70px;
  background-color: #f27983;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

export const MapMarkerImage = styled.Image.attrs({ resizeMode: 'cover' })`
  width: 90px;
  height: 45px;
`;

export const MapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Comfortaa-Medium';
  color: #fff;
  font-size: 13px;
  line-height: 23px;
  text-align: center;
`;

export const ServiceListContainer = styled.View`
  margin-top: -200px;
`;

export const ServicesList = styled(
  FlatList as new () => FlatList<Service>,
).attrs({
  contentContainerStyle: { paddingHorizontal: 8 },
})`
  padding: 30px 0;
`;

export const ServiceContainer = styled.TouchableOpacity<ProviderContainerProps>`
  height: 140px;
  width: 140px;

  margin: 0 8px;
  padding: 10px;

  border: 2px;
  border-radius: 8px;
  border-color: #f27983;

  background: ${(props) => (props.selected ? '#f2b3ca' : '#fff')};

  align-items: center;
`;

export const ServiceAvatar = styled(SvgUri).attrs({
  width: '70px',
  height: '70px',
})`
  color: #000;
`;

export const ServiceNameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ServiceName = styled.Text<ProviderNameProps>`
  font-family: 'Comfortaa-Medium';
  font-size: 14px;
  color: #000;
  text-align: center;
`;
