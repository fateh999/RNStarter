import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {fetcher} from 'src/Utils/Helpers';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {REGISTER_REQUEST} from '../Types/RequestTypes';
import {REGISTER_RESPONSE} from '../Types/ResponseTypes';
import {getAuthValue, setAuthValue} from './useAuthValue';

const register = async (
  data: REGISTER_REQUEST,
): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
  return fetcher({
    url: '/auth/register',
    method: 'POST',
    data,
  });
};

function useRegisterMutation() {
  return useMutation(register, {
    onSuccess: responseData => {
      if (responseData) {
        const {status, data} = responseData;
        if (status === 201) {
          SnackbarHandler.successToast('Registered successfully');
          setAuthValue({
            ...getAuthValue(),
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
