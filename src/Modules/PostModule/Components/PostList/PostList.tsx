import React from 'react';
import {FlatList} from 'react-native';
import Block from 'src/Components/Block/Block';
import usePostsQuery from '../../Hooks/usePostsQuery';
import PostItem from '../PostItem/PostItem';

function PostList() {
  const postsQuery = usePostsQuery();
  const posts = postsQuery.data?.data?.data || [];

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <PostItem item={item} />}
      ItemSeparatorComponent={() => <Block height={20} />}
      ListHeaderComponent={() => <Block height={20} />}
      ListFooterComponent={() => <Block height={20} />}
    />
  );
}

export default PostList;
