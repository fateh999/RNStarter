import {useRoute, RouteProp} from '@react-navigation/core';
import React from 'react';
import {useForm} from 'react-hook-form';
import Block from 'src/Components/Block/Block';
import Button from 'src/Components/Button/Button';
import FormBuilder from 'src/Components/FormBuilder/FormBuilder';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import {getRequiredRules} from 'src/Utils/Helpers';
import useAddPostMutation from '../../Hooks/useAddPostMutation';
import useEditPostMutation from '../../Hooks/useEditPostMutation';
import {POST_REQUEST} from '../../Types/RequestTypes';

function PostForm() {
  const route = useRoute<RouteProp<AuthStackParamList, 'Post'>>();
  const {post, mode} = route.params;
  const {control, setFocus, handleSubmit} = useForm<POST_REQUEST>({
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
    },
    mode: 'onChange',
  });

  const addPostMutation = useAddPostMutation();
  const editPostMutation = useEditPostMutation();
  const loading = addPostMutation.isLoading || editPostMutation.isLoading;

  return (
    <Block margin={15}>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            name: 'title',
            type: 'text',
            label: 'Title',
            textInputProps: {
              placeholder: 'Enter Title',
            },
            rules: getRequiredRules('Title'),
          },
          {
            name: 'content',
            type: 'text',
            label: 'Content',
            textInputProps: {
              placeholder: 'Enter Content',
              multiline: true,
              style: {minHeight: 100, maxHeight: 200},
            },
            rules: getRequiredRules('Content'),
          },
        ]}
      />
      <Block height={15} />
      <Button
        onPress={handleSubmit(values => {
          if (mode === 'edit') {
            editPostMutation.mutate({...values, id: post?.id});
          } else {
            addPostMutation.mutate(values);
          }
        })}
        loading={loading}
        disabled={loading}>
        Submit
      </Button>
      <Block height={15} />
    </Block>
  );
}

export default PostForm;
