import {useRoute, RouteProp} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import {fetcher} from 'src/Utils/Helpers';
import {POST_RESPONSE} from '../Types/ResponseTypes';

export const GET_POST_QUERY_KEY = (id: number) => `getPost/${id}`;

const getPost = (id: number): Promise<AxiosResponse<POST_RESPONSE>> => {
  return fetcher({
    url: `/posts/${id}`,
  });
};

function usePostQuery() {
  const route = useRoute<RouteProp<AuthStackParamList, 'Detail'>>();
  const {id} = route.params;

  return useQuery(GET_POST_QUERY_KEY(id), () => getPost(id));
}

export default usePostQuery;
