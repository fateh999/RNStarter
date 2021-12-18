import React from 'react';
import LoginScreen from 'src/Screens/Login/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from 'src/Screens/Register/RegisterScreen';
import {Platform} from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
        headerShown: false,
      }}>
      <RootStack.Screen name={'Login'} component={LoginScreen} />
      <RootStack.Screen name={'Register'} component={RegisterScreen} />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
