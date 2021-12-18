import {useEffect, useState} from 'react';
import AuthService from '../Services/AuthService';
import {AUTH_STATE} from '../Types/CommonTypes';

function useAuthValue() {
  const [authState, setAuthState] = useState(AuthService.authState$.getValue());

  useEffect(() => {
    const subscription = AuthService.authState$.subscribe(setAuthState);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return authState;
}

export default useAuthValue;

export const getAuthValue = () => AuthService.authState$.getValue();

export const setAuthValue = (authState: AUTH_STATE) =>
  AuthService.authState$.next(authState);

export const resetAuthValue = () => AuthService.resetAuthValue();
