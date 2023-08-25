import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuthValue from 'src/Modules/AuthModule/Hooks/useAuthValue';
import {Platform} from 'react-native';
import HomeScreen from 'src/Screens/Home/HomeScreen';
import LoginScreen from 'src/Screens/Login/LoginScreen';
import RegisterScreen from 'src/Screens/Register/RegisterScreen';

const MainStack = createNativeStackNavigator<MainStackParamList>();

export type MainStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

function MainStackNavigator() {
  const {loggedIn} = useAuthValue();

  return (
    <MainStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
        headerShown: false,
      }}>
      {loggedIn ? (
        <MainStack.Group>
          <MainStack.Screen name={'Home'} component={HomeScreen} />
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen name={'Login'} component={LoginScreen} />
          <MainStack.Screen name={'Register'} component={RegisterScreen} />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
