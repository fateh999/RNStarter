import React from 'react';
import Button from 'src/Components/Button';
import Container from 'src/Components/Container';
import Stack from 'src/Components/Stack';
import {
  getAuthValue,
  setAuthValue,
} from 'src/Modules/AuthModule/Hooks/useAuthValue';

function HomeScreen() {
  return (
    <Container>
      <Stack flex={1} margin={16}>
        <Button
          variant="error"
          onPress={() => {
            setAuthValue({...getAuthValue(), loggedIn: false});
          }}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
}

export default HomeScreen;
