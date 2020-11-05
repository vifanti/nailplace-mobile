import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
// import ServiceButton from '../../components/ServiceButton';

import {
  Container,
  BackButton,
  Title,
  MapContainer,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ServiceListContainer,
  ServicesList,
  ServiceContainer,
  ServiceAvatar,
  ServiceNameContainer,
  ServiceName,
} from './styles';

export interface Service {
  id: number;
  title: string;
  image_url: string;
}

interface Provider {
  id: number;
  name: string;
  user: {
    name: string;
    avatar: string;
  };
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  // const navigation = useNavigation();
  const { signOut } = useAuth();

  useEffect(() => {
    async function loadPosition(): Promise<void> {
      // Geolocation.requestAuthorization;

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'NailPlace permissão de localização',
          message:
            'NailPlace precisa das permissões de locação para mostrar os prestadores disponíveis',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Ooooops...',
          'Precisamos de sua permissão para obter a localização',
        );
        return;
      }
      Geolocation.getCurrentPosition((info) => {
        const { latitude, longitude } = info.coords;
        setInitialPosition([latitude, longitude]);
      });
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('services').then((response) => {
      setServices(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('providers', {
        params: { selectedServices },
      })
      .then((response) => {
        setProviders(response.data);
      });
  }, [selectedServices]);

  function handleSelectService(id: number): void {
    const alreadySelected = selectedServices.findIndex(
      (service) => service === id,
    );
    if (alreadySelected >= 0) {
      const filteredServices = selectedServices.filter(
        (service) => service !== id,
      );

      setSelectedServices(filteredServices);
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  }

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   enabled
    // >
    // <ScrollView
    //   keyboardShouldPersistTaps="handled"
    //   contentContainerStyle={{ flexGrow: 1 }}
    // >
    <Container>
      <BackButton onPress={signOut}>
        <Icon
          name="log-out"
          size={24}
          style={{ transform: [{ rotate: '180deg' }] }}
        />
      </BackButton>

      <MapContainer>
        <Title>Selecione os serviços desejados</Title>
        {initialPosition[0] !== 0 && (
          <MapView
            style={{ width: '100%', height: '100%' }}
            loadingEnabled={initialPosition[0] === 0}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            {providers.map((provider) => (
              <Marker
                key={String(provider.id)}
                style={{ width: 90, height: 80 }}
                // onPress={() => { }}
                coordinate={{
                  latitude: provider.latitude,
                  longitude: provider.longitude,
                }}
              >
                <MapMarkerContainer>
                  <MapMarkerImage
                    source={{
                      uri: provider.user.avatar,
                    }}
                  />
                  <MapMarkerTitle>{provider.user.name}</MapMarkerTitle>
                </MapMarkerContainer>
              </Marker>
            ))}
          </MapView>
        )}
      </MapContainer>

      <ServiceListContainer>
        <ServicesList
          data={services}
          keyExtractor={(service) => String(service.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: service }) => (
            <ServiceContainer
              onPress={() => handleSelectService(service.id)}
              selected={!!selectedServices.find((s) => s === service.id)}
              activeOpacity={0.6}
            >
              <ServiceAvatar uri={service.image_url} />
              <ServiceNameContainer>
                <ServiceName
                  selected={!!selectedServices.find((s) => s === service.id)}
                >
                  {service.title}
                </ServiceName>
              </ServiceNameContainer>
            </ServiceContainer>
          )}
        />
      </ServiceListContainer>
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Home;
