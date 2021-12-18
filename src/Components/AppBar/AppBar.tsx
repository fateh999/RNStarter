import {useNavigation} from '@react-navigation/core';
import React from 'react';
import Block from '../Block/Block';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';

type AppBarProps = {
  left?: any;
  back?: boolean;
  right?: any;
  title?: string;
};

function AppBar(props: AppBarProps) {
  const {left, right, back, title} = props;
  const navigation = useNavigation();

  return (
    <Block flexDirection={'row'} elevation={5} height={60} variant={'primary'}>
      <Block alignItems={'center'} justifyContent={'center'} flex={1}>
        {back ? (
          <IconButton
            iconVariant={'white'}
            name={'arrow-left'}
            onPress={navigation.goBack}
          />
        ) : (
          left
        )}
      </Block>
      <Block flex={6} justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'white'} fontSize={24}>
          {title}
        </Typography>
      </Block>
      <Block alignItems={'center'} justifyContent={'center'} flex={1}>
        {right}
      </Block>
    </Block>
  );
}

export default AppBar;
