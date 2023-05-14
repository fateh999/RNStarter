import React, {forwardRef, memo, ReactNode, useMemo} from 'react';
import {Platform, View, ViewProps, ViewStyle} from 'react-native';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';

export type StackProps = {
  children?: ReactNode;
  variant?: VARIANT;
} & ViewProps &
  ViewStyle;

function Stack(props: StackProps, ref: React.LegacyRef<View> | undefined) {
  const {
    children,
    elevation = 0,
    style,
    variant,
    backgroundColor,
    onLayout,
    pointerEvents,
    testID,
    ...styleProps
  } = props;
  const theme = useThemeValue();
  const iosShadowElevation = useMemo(
    () =>
      elevation === 0
        ? {}
        : {
            shadowOpacity: 0.0015 * elevation + 0.18,
            shadowRadius: 0.54 * elevation,
            shadowOffset: {
              height: 0.6 * elevation,
              width: 0,
            },
            shadowColor: theme.colors.onSurface,
          },
    [elevation, theme.colors.onSurface],
  );

  return (
    <View
      ref={ref}
      testID={testID}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      style={[
        Platform.OS === 'ios' ? {...iosShadowElevation} : {elevation},
        styleProps,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : variant
            ? theme.colors[variant]
            : theme.colors.transparent,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export default memo(forwardRef(Stack));
