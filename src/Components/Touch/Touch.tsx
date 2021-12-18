import React, {forwardRef} from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import Block from '../Block/Block';
import {useAnimationState, View as MotiView} from 'moti';

export type TouchProps = PressableProps &
  ViewStyle & {variant?: VARIANT; style?: ViewStyle};

function Touch(props: TouchProps, ref: React.Ref<View> | undefined) {
  const {
    onPress,
    children,
    backgroundColor,
    variant = 'transparent',
    android_disableSound,
    android_ripple = {borderless: false},
    delayLongPress,
    disabled,
    hitSlop,
    onLongPress,
    onPressIn,
    onPressOut,
    pressRetentionOffset,
    testID,
    style,
    elevation,
    borderRadius,
    ...styleProps
  } = props;
  const theme = useThemeValue();

  const animationState = useAnimationState({
    from: {
      opacity: 0.5,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <Block elevation={elevation}>
      <Block
        height={styleProps.height ?? style?.height}
        width={styleProps.width ?? style?.width}
        borderRadius={borderRadius ?? style?.borderRadius}
        overflow={'hidden'}>
        <MotiView
          state={animationState}
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : variant
              ? theme.colors[variant]
              : theme.colors.transparent,
          }}>
          <Pressable
            ref={ref}
            testID={testID}
            android_disableSound={android_disableSound}
            android_ripple={android_ripple}
            delayLongPress={delayLongPress}
            disabled={disabled}
            hitSlop={hitSlop}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={
              onPressIn ??
              (() => {
                if (Platform.OS === 'ios') {
                  animationState.transitionTo('from');
                }
              })
            }
            onPressOut={
              onPressOut ??
              (() => {
                if (Platform.OS === 'ios') {
                  animationState.transitionTo('to');
                }
              })
            }
            pressRetentionOffset={pressRetentionOffset}
            style={[
              styleProps,
              {
                borderRadius,
              },
              style,
            ]}>
            {children}
          </Pressable>
        </MotiView>
      </Block>
    </Block>
  );
}

export default forwardRef(Touch);
