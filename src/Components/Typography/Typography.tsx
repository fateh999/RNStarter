import React, {forwardRef, ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {VARIANT, FONT_TYPES} from 'src/Modules/ThemeModule/Types/CommonTypes';

export type TypographyProps = {
  variant?: VARIANT;
  type?: FONT_TYPES;
  children?: ReactNode;
} & TextProps &
  TextStyle;

function Typography(
  props: TypographyProps,
  ref: React.LegacyRef<Text> | undefined,
) {
  const {
    style,
    color,
    textDecorationColor = color,
    type,
    variant,
    children,
    testID,
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    accessible,
    adjustsFontSizeToFit,
    allowFontScaling = false,
    ellipsizeMode,
    maxFontSizeMultiplier,
    numberOfLines,
    onLongPress,
    onLayout,
    selectionColor,
    onTextLayout,
    selectable,
    textBreakStrategy,
    onPress,
    ...textStyleProps
  } = props;
  const theme = useThemeValue();
  const {fontFamily, fontWeight} = theme.fonts[type ?? 'regular'];

  return (
    <Text
      ref={ref}
      onPress={onPress}
      testID={testID}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessible={accessible}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      allowFontScaling={allowFontScaling}
      ellipsizeMode={ellipsizeMode}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      numberOfLines={numberOfLines}
      onLongPress={onLongPress}
      onLayout={onLayout}
      selectionColor={selectionColor}
      onTextLayout={onTextLayout}
      selectable={selectable}
      textBreakStrategy={textBreakStrategy}
      style={[
        {fontFamily, fontWeight},
        textStyleProps,
        {
          color: color
            ? color
            : variant
            ? theme.colors[variant]
            : theme.colors.text,
          textDecorationColor: textDecorationColor
            ? textDecorationColor
            : variant
            ? theme.colors[variant]
            : theme.colors.text,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

export default forwardRef(Typography);
