import {useFocusEffect} from '@react-navigation/core';
import React, {Fragment, useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Block from '../Block/Block';
import SafeAreaBlock from '../SafeAreaBlock/SafeAreaBlock';

export type ContainerProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  fullScreen?: boolean;
  variant?: VARIANT;
};

function Container(props: ContainerProps) {
  const {
    children,
    backgroundColor,
    fullScreen,
    statusBarBackgroundColor,
    statusBarStyle = 'light-content',
    variant,
  } = props;
  const theme = useThemeValue();
  const statusBarBackgroundColorIos =
    statusBarBackgroundColor ??
    (fullScreen ? theme.colors.transparent : theme.colors.adaptivePrimary);
  const screenBackgroundColor = backgroundColor
    ? backgroundColor
    : variant
    ? theme.colors[variant]
    : theme.colors.surface;

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(fullScreen ?? false);
        StatusBar.setBackgroundColor(
          statusBarBackgroundColor ?? theme.colors.adaptivePrimary,
        );
      }
      StatusBar.setBarStyle(statusBarStyle);
    }, [
      fullScreen,
      statusBarBackgroundColor,
      statusBarStyle,
      theme.colors.adaptivePrimary,
    ]),
  );

  return (
    <Block flex={1} backgroundColor={screenBackgroundColor}>
      {fullScreen ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          <SafeAreaBlock
            flex={0}
            backgroundColor={statusBarBackgroundColorIos}
          />
          <SafeAreaBlock flex={1} backgroundColor={screenBackgroundColor}>
            {children}
          </SafeAreaBlock>
        </Fragment>
      )}
    </Block>
  );
}

export default Container;
