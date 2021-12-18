import {useNavigation} from '@react-navigation/core';
import {useMutation} from 'react-query';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import PostService from '../Services/PostService';

function useDeletePostMutation(back?: boolean) {
  const navigation = useNavigation();
  return useMutation(PostService.deletePost, {
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
