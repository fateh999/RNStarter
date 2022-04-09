import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {fetcher} from 'src/Utils/Helpers';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {LOGIN_REQUEST} from '../Types/RequestTypes';
import {LOGIN_RESPONSE} from '../Types/ResponseTypes';
import {getAuthValue, setAuthValue} from './useAuthValue';

const login = async (
  data: LOGIN_REQUEST,
): Promise<AxiosResponse<LOGIN_RESPONSE>> => {
  return fetcher({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

function useLoginMutation() {
  return useMutation(login, {
    onSuccess: responseData => {
      if (responseData) {
        const {status, data} = responseData;
        if (status === 200) {
          SnackbarHandler.successToast('Logged in successfully');
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

export default useLoginMutation;
