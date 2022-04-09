import {useNavigation} from '@react-navigation/core';
import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {fetcher} from 'src/Utils/Helpers';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {POST_DELETE_RESPONSE} from '../Types/ResponseTypes';

const deletePost = (
  id: number,
): Promise<AxiosResponse<POST_DELETE_RESPONSE>> => {
  return fetcher({
    url: `/posts/${id}`,
    method: 'DELETE',
  });
};

function useDeletePostMutation(back?: boolean) {
  const navigation = useNavigation();
  return useMutation(deletePost, {
    onSuccess: responseData => {
      const {data} = responseData;
      if (data?.message) {
        SnackbarHandler.successToast(data.message);
      }
      if (back) {
        navigation.goBack();
      }
      queryClient.refetchQueries();
    },
  });
}

export default useDeletePostMutation;
