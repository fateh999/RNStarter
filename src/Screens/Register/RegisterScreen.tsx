import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Button from 'src/Components/Button';
import Container from 'src/Components/Container';
import Stack from 'src/Components/Stack';

function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <Container>
      <Stack flex={1} margin={16}>
        <Button onPress={navigation.goBack}>Back</Button>
      </Stack>
    </Container>
  );
}

export default RegisterScreen;
