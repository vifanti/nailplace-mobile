import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import Index from '../pages/Index';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
        paddingBottom: getBottomSpace(),
      },
    }}
  >
    <Auth.Screen name="Index" component={Index} />
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
