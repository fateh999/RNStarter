import React, {forwardRef, memo, ReactNode, useCallback, useMemo} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  SPACING_SIZES,
  VARIANT,
} from 'src/Modules/ThemeModule/Types/CommonTypes';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';

export type SafeAreaStackProps = {
  children?: ReactNode;
  variant?: VARIANT;
  padding?: number | keyof SPACING_SIZES;
  paddingBottom?: number | keyof SPACING_SIZES;
  paddingEnd?: number | keyof SPACING_SIZES;
  paddingHorizontal?: number | keyof SPACING_SIZES;
  paddingLeft?: number | keyof SPACING_SIZES;
  paddingRight?: number | keyof SPACING_SIZES;
  paddingStart?: number | keyof SPACING_SIZES;
  paddingTop?: number | keyof SPACING_SIZES;
  paddingVertical?: number | keyof SPACING_SIZES;
  margin?: number | keyof SPACING_SIZES;
  marginBottom?: number | keyof SPACING_SIZES;
  marginEnd?: number | keyof SPACING_SIZES;
  marginHorizontal?: number | keyof SPACING_SIZES;
  marginLeft?: number | keyof SPACING_SIZES;
  marginRight?: number | keyof SPACING_SIZES;
  marginStart?: number | keyof SPACING_SIZES;
  marginTop?: number | keyof SPACING_SIZES;
  marginVertical?: number | keyof SPACING_SIZES;
} & ViewProps &
  ViewStyle;

function SafeAreaStack(
  props: SafeAreaStackProps,
  ref: React.LegacyRef<SafeAreaView> | undefined,
) {
  const {
    children,
    elevation = 0,
    style,
    variant,
    backgroundColor,
    onLayout,
    pointerEvents,
    testID,
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
    margin,
    marginBottom,
    marginEnd,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginStart,
    marginTop,
    marginVertical,
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

  const getSpacingValue = useCallback(
    (value?: number | keyof SPACING_SIZES) => {
      if (!value) {
        return undefined;
      }
      return typeof value === 'number' ? value : theme.spacingSizes[value];
    },
    [theme],
  );

  const memoisedStyles = useMemo(
    () =>
      StyleSheet.create({
        viewStyles: {
          backgroundColor: backgroundColor
            ? backgroundColor
            : variant
            ? theme.colors[variant]
            : theme.colors.transparent,
          padding: getSpacingValue(padding),
          paddingBottom: getSpacingValue(paddingBottom),
          paddingEnd: getSpacingValue(paddingEnd),
          paddingHorizontal: getSpacingValue(paddingHorizontal),
          paddingLeft: getSpacingValue(paddingLeft),
          paddingRight: getSpacingValue(paddingRight),
          paddingStart: getSpacingValue(paddingStart),
          paddingTop: getSpacingValue(paddingTop),
          paddingVertical: getSpacingValue(paddingVertical),
          margin: getSpacingValue(margin),
          marginBottom: getSpacingValue(marginBottom),
          marginEnd: getSpacingValue(marginEnd),
          marginHorizontal: getSpacingValue(marginHorizontal),
          marginLeft: getSpacingValue(marginLeft),
          marginRight: getSpacingValue(marginRight),
          marginStart: getSpacingValue(marginStart),
          marginTop: getSpacingValue(marginTop),
          marginVertical: getSpacingValue(marginVertical),
        },
      }),
    [
      backgroundColor,
      getSpacingValue,
      margin,
      marginBottom,
      marginEnd,
      marginHorizontal,
      marginLeft,
      marginRight,
      marginStart,
      marginTop,
      marginVertical,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      paddingVertical,
      theme.colors,
      variant,
    ],
  );

  return (
    <SafeAreaView
      ref={ref}
      testID={testID}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      style={[
        Platform.OS === 'ios' ? iosShadowElevation : {elevation},
        styleProps,
        memoisedStyles.viewStyles,
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
}

export default memo(forwardRef(SafeAreaStack));
