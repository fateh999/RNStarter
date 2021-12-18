import {AxiosResponse} from 'axios';
import {fetcher} from 'src/Utils/Helpers';
import {POST_REQUEST} from '../Types/RequestTypes';
import {
  MUTATE_POST_RESPONSE,
  POSTS_RESPONSE,
  POST_DELETE_RESPONSE,
  POST_RESPONSE,
} from '../Types/ResponseTypes';

class PostService {
  queryKeys = {
    getPosts: 'getPosts',
    getPost: (id: number) => `getPosts/${id}`,
  };

  getPosts = (): Promise<AxiosResponse<POSTS_RESPONSE>> => {
    return fetcher({
      url: '/posts',
    });
  };

  getPost = (id: number): Promise<AxiosResponse<POST_RESPONSE>> => {
    return fetcher({
      url: `/posts/${id}`,
    });
  };

  addPost = (
    data: POST_REQUEST,
  ): Promise<AxiosResponse<MUTATE_POST_RESPONSE>> => {
    return fetcher({
      url: '/posts',
      method: 'POST',
      data,
    });
  };

  editPost = (
    data: POST_REQUEST,
  ): Promise<AxiosResponse<MUTATE_POST_RESPONSE>> => {
    return fetcher({
      url: `/posts/${data.id}`,
      method: 'PATCH',
      data,
    });
  };

  deletePost = (id: number): Promise<AxiosResponse<POST_DELETE_RESPONSE>> => {
    return fetcher({
      url: `/posts/${id}`,
      method: 'DELETE',
    });
  };
}

export default new PostService();
