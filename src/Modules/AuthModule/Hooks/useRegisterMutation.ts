import {useMutation} from 'react-query';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import AuthService from '../Services/AuthService';
import {setAuthValue} from './useAuthValue';

function useRegisterMutation() {
  return useMutation(AuthService.register, {
    onSuccess: responseData => {
      if (responseData) {
        const {status, data} = responseData;
        if (status === 201) {
          SnackbarHandler.successToast('Registered successfully');
          setAuthValue({
            loggedIn: true,
            user: data?.user,
            token: data?.jwt,
          });
        }
      }
    },
  });
}

export default useRegisterMutation;
