import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from 'src/Screens/Home/HomeScreen';
import {Platform} from 'react-native';
import {POST} from 'src/Modules/PostModule/Types/ResponseTypes';
import DetailScreen from 'src/Screens/Detail/DetailScreen';
import PostScreen from 'src/Screens/Post/PostScreen';

export type AuthStackParamList = {
  Home: undefined;
  Post: {mode: 'add' | 'edit'; post?: POST};
  Detail: {id: number};
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'default',
        headerShown: false,
      }}>
      <AuthStack.Screen name={'Home'} component={HomeScreen} />
      <AuthStack.Screen name={'Post'} component={PostScreen} />
      <AuthStack.Screen name={'Detail'} component={DetailScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
