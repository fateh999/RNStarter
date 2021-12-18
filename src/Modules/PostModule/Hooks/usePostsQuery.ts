import {useQuery} from 'react-query';
import PostService from '../Services/PostService';

function usePostsQuery() {
  return useQuery(PostService.queryKeys.getPosts, PostService.getPosts);
}

export default usePostsQuery;
