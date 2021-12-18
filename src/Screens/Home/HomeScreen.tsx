import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import AppBar from 'src/Components/AppBar/AppBar';
import Container from 'src/Components/Container/Container';
import IconButton from 'src/Components/IconButton/IconButton';
import {resetAuthValue} from 'src/Modules/AuthModule/Hooks/useAuthValue';
import PostList from 'src/Modules/PostModule/Components/PostList/PostList';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Home'>>();

  return (
    <Container variant={'background'}>
      <AppBar
        title={'Home'}
        left={
          <IconButton
            name={'plus'}
            iconVariant={'white'}
            onPress={() => {
              navigation.navigate('Post', {mode: 'add'});
            }}
          />
        }
        right={
          <IconButton
            name={'logout'}
            iconVariant={'white'}
            onPress={resetAuthValue}
          />
        }
      />
      <PostList />
    </Container>
  );
}

export default HomeScreen;
