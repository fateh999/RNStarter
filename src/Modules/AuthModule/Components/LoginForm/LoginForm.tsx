import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import Block from 'src/Components/Block/Block';
import Button from 'src/Components/Button/Button';
import FormBuilder from 'src/Components/FormBuilder/FormBuilder';
import {RootStackParamList} from 'src/Navigation/StackNavigators/RootStackNavigator';
import {getEmailValidationRules, getRequiredRules} from 'src/Utils/Helpers';
import useLoginMutation from '../../Hooks/useLoginMutation';
import {LOGIN_REQUEST} from '../../Types/RequestTypes';

function LoginForm() {
  const {control, setFocus, handleSubmit} = useForm<LOGIN_REQUEST>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const loginMutation = useLoginMutation();

  return (
    <Block margin={15}>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
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
            name: 'password',
            type: 'password',
            label: 'Password',
            textInputProps: {
              placeholder: 'Enter Password',
            },
            rules: getRequiredRules('Password'),
          },
        ]}
      />
      <Block height={15} />
      <Button
        onPress={handleSubmit(values => {
          loginMutation.mutate(values);
        })}
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}>
        Login
      </Button>
      <Block height={15} />
      <Button
        variant={'black'}
        type={'text'}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        Register
      </Button>
      <Block height={15} />
    </Block>
  );
}

export default LoginForm;
