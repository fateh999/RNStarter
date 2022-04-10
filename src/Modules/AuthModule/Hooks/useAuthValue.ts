import useObservableValue from 'src/Hooks/useObservableValue';
import authState$, {initialAuthState} from '../Observables/authState$';
import {AUTH_STATE} from '../Types/CommonTypes';

function useAuthValue() {
  return useObservableValue(authState$);
}

export default useAuthValue;

export const getAuthValue = () => authState$.getValue();

export const setAuthValue = (authState: AUTH_STATE) =>
  authState$.next(authState);

export const resetAuthValue = () => setAuthValue(initialAuthState);
