import {useMutation} from 'react-query';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import AuthService from '../Services/AuthService';
import {setAuthValue} from './useAuthValue';

function useLoginMutation() {
  return useMutation(AuthService.login, {
    onSuccess: responseData => {
      if (responseData) {
        const {status, data} = responseData;
        if (status === 200) {
          SnackbarHandler.successToast('Logged in successfully');
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

export default useLoginMutation;
