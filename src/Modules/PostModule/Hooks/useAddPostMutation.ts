import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import {fetcher} from 'src/Utils/Helpers';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {POST_REQUEST} from '../Types/RequestTypes';
import {MUTATE_POST_RESPONSE} from '../Types/ResponseTypes';

const addPost = (
  data: POST_REQUEST,
): Promise<AxiosResponse<MUTATE_POST_RESPONSE>> => {
  return fetcher({
    url: '/posts',
    method: 'POST',
    data,
  });
};

function useAddPostMutation() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Post'>>();

  return useMutation(addPost, {
    onSuccess: responseData => {
      const {data, status} = responseData;
      if (status === 201) {
        navigation.goBack();
        navigation.navigate('Detail', {id: data.data.id});
        SnackbarHandler.successToast(data.message);
        queryClient.refetchQueries();
      }
    },
  });
}

export default useAddPostMutation;
