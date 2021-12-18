import React from 'react';
import AppBar from 'src/Components/AppBar/AppBar';
import Body from 'src/Components/Body/Body';
import Container from 'src/Components/Container/Container';
import RegisterForm from 'src/Modules/AuthModule/Components/RegisterForm/RegisterForm';

function RegisterScreen() {
  return (
    <Container>
      <AppBar title={'Register'} back />
      <Body>
        <RegisterForm />
      </Body>
    </Container>
  );
}

export default RegisterScreen;
