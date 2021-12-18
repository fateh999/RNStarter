import React from 'react';
import {MaterialIndicator} from 'react-native-indicators';
import AppBar from 'src/Components/AppBar/AppBar';
import Block from 'src/Components/Block/Block';
import Body from 'src/Components/Body/Body';
import Container from 'src/Components/Container/Container';
import PostItem from 'src/Modules/PostModule/Components/PostItem/PostItem';
import usePostQuery from 'src/Modules/PostModule/Hooks/usePostQuery';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';

function DetailScreen() {
  const postQuery = usePostQuery();
  const post = postQuery.data?.data?.data;
  const theme = useThemeValue();

  return (
    <Container>
      <AppBar back title={post?.title} />
      <Body>
        <Block height={20} />
        {post ? (
          <PostItem item={post} back />
        ) : (
          <Block flex={1} justifyContent={'center'} alignItems={'center'}>
            <MaterialIndicator color={theme.colors.primary} />
          </Block>
        )}
      </Body>
    </Container>
  );
}

export default DetailScreen;
