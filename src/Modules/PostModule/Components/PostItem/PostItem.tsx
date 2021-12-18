import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Alert} from 'react-native';
import Block from 'src/Components/Block/Block';
import IconButton from 'src/Components/IconButton/IconButton';
import Touch from 'src/Components/Touch/Touch';
import Typography from 'src/Components/Typography/Typography';
import useAuthValue from 'src/Modules/AuthModule/Hooks/useAuthValue';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import useDeletePostMutation from '../../Hooks/useDeletePostMutation';
import {POST} from '../../Types/ResponseTypes';

type PostItemProps = {
  item: POST;
  back?: boolean;
};

function PostItem(props: PostItemProps) {
  const {item, back} = props;
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, 'Home' | 'Detail'>
    >();
  const {user} = useAuthValue();
  const deletePostMutation = useDeletePostMutation(back);

  return (
    <Block marginHorizontal={20} padding={10} elevation={10} variant={'white'}>
      <Touch
        onPress={() => {
          navigation.navigate('Detail', {id: item.id});
        }}>
        <Block>
          <Block flexDirection={'row'} justifyContent={'space-between'}>
            <Block>
              <Typography fontSize={16}>{item.author.name}</Typography>
              <Typography fontSize={12} variant={'placeholder'}>
                {item.author.email}
              </Typography>
            </Block>
            {user?.id === item.author.id && (
              <Block flexDirection={'row'}>
                <IconButton
                  name={'pencil'}
                  onPress={() => {
                    navigation.navigate('Post', {mode: 'edit', post: item});
                  }}
                />
                <IconButton
                  name={'delete'}
                  disabled={deletePostMutation.isLoading}
                  iconVariant={'error'}
                  onPress={() => {
                    Alert.alert(
                      'Delete Post',
                      'Are you sure you want to delete this post?',
                      [
                        {
                          text: 'Yes',
                          style: 'destructive',
                          onPress: () => {
                            deletePostMutation.mutate(item.id);
                          },
                        },
                        {
                          text: 'No',
                          style: 'cancel',
                        },
                      ],
                    );
                  }}
                />
              </Block>
            )}
          </Block>
          <Block height={5} />
          <Block height={1} variant={'divider'} />
          <Block height={10} />
          <Typography textAlign={'center'} fontSize={18}>
            {item.title}
          </Typography>
          <Block paddingVertical={10}>
            <Typography fontSize={14} variant={'primary'}>
              {item.content}
            </Typography>
          </Block>
        </Block>
      </Touch>
    </Block>
  );
}

export default PostItem;
