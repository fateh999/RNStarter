import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import useAuthValue from 'src/Modules/AuthModule/Hooks/useAuthValue';
import AuthStackNavigator from './StackNavigators/AuthStackNavigator';
import RootStackNavigator from './StackNavigators/RootStackNavigator';

function Router() {
  const {loggedIn} = useAuthValue();

  return (
    <NavigationContainer>
      {loggedIn ? <AuthStackNavigator /> : <RootStackNavigator />}
    </NavigationContainer>
  );
}

export default Router;
