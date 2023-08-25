import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import Button from 'src/Components/Button';
import Container from 'src/Components/Container';
import Stack from 'src/Components/Stack';
import {
  getAuthValue,
  setAuthValue,
} from 'src/Modules/AuthModule/Hooks/useAuthValue';
import {MainStackParamList} from 'src/Navigation/StackNavigators/MainStackNavigator';

function LoginScreen() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  return (
    <Container>
      <Stack flex={1} margin={16}>
        <Button
          onPress={() => {
            setAuthValue({...getAuthValue(), loggedIn: true});
          }}>
          Login
        </Button>
        <Stack height={16} />
        <Button
          variant="black"
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Go To Register
        </Button>
      </Stack>
    </Container>
  );
}

export default LoginScreen;
