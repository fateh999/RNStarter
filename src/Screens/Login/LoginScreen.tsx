import React from 'react';
import AppBar from 'src/Components/AppBar/AppBar';
import Container from 'src/Components/Container/Container';
import LoginForm from 'src/Modules/AuthModule/Components/LoginForm/LoginForm';

function LoginScreen() {
  return (
    <Container>
      <AppBar title={'Login'} />
      <LoginForm />
    </Container>
  );
}

export default LoginScreen;
