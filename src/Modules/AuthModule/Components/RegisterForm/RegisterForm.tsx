import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import Block from 'src/Components/Block/Block';
import Button from 'src/Components/Button/Button';
import FormBuilder from 'src/Components/FormBuilder/FormBuilder';
import {RootStackParamList} from 'src/Navigation/StackNavigators/RootStackNavigator';
import {
  getEmailValidationRules,
  getPasswordValidationRules,
  getPhoneNumberValidationRules,
  getRequiredRules,
} from 'src/Utils/Helpers';
import useRegisterMutation from '../../Hooks/useRegisterMutation';
import {REGISTER_REQUEST} from '../../Types/RequestTypes';

function RegisterForm() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Register'>>();
  const {control, setFocus, watch, trigger, handleSubmit} =
    useForm<REGISTER_REQUEST>({
      defaultValues: {
        name: '',
        email: '',
        phoneNumber: '',
        countryCode: '',
        password: '',
      },
      mode: 'onChange',
    });
  const registerMutation = useRegisterMutation();

  return (
    <Block margin={15}>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            name: 'name',
            type: 'text',
            label: 'Name',
            textInputProps: {
              placeholder: 'Enter Name',
            },
            rules: getRequiredRules('Name'),
          },
          {
            name: 'email',
            type: 'email',
            label: 'Email',
            textInputProps: {
              placeholder: 'Enter Email',
            },
            rules: getEmailValidationRules(),
          },
          {
            name: 'phoneNumber',
            callingCodeName: 'countryCode',
            onCallingCodeChanged: () => {
              trigger('phoneNumber');
            },
            type: 'phone',
            label: 'Phone Number',
            textInputProps: {
              placeholder: 'Enter Phone Number',
            },
            rules: getPhoneNumberValidationRules(watch('countryCode')),
          },
          {
            name: 'password',
            type: 'password',
            label: 'Password',
            textInputProps: {
              placeholder: 'Enter Password',
            },
            rules: getPasswordValidationRules(),
          },
        ]}
      />
      <Block height={15} />
      <Button
        onPress={handleSubmit(values => {
          console.log({values});
          registerMutation.mutate(values);
        })}
        loading={registerMutation.isLoading}
        disabled={registerMutation.isLoading}>
        Register
      </Button>
      <Block height={15} />
      <Button
        variant={'black'}
        type={'text'}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Login
      </Button>
      <Block height={15} />
    </Block>
  );
}

export default RegisterForm;
