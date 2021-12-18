import {useRoute, RouteProp} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import PostService from '../Services/PostService';

function usePostQuery() {
  const route = useRoute<RouteProp<AuthStackParamList, 'Detail'>>();
  const {id} = route.params;

  return useQuery(PostService.queryKeys.getPost(id), () =>
    PostService.getPost(id),
  );
}

export default usePostQuery;
