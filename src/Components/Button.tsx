import React from 'react';
import Stack, {StackProps} from './Stack';
import Touch from './Touch';
import Typography, {TypographyProps} from './Typography';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {ActivityIndicator, ColorValue} from 'react-native';

type ButtonProps = {
  children: string | JSX.Element;
  onPress?: () => void;
  height?: number;
  width?: number;
  borderRadius?: number;
  fontSize?: number;
  borderWidth?: number;
  borderColor?: ColorValue;
  variant?: VARIANT;
  typographyVariant?: VARIANT;
  stackProps?: StackProps;
  typographyProps?: TypographyProps;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'filled' | 'outlined';
  elevation?: number;
};

function Button(props: ButtonProps) {
  const theme = useThemeValue();
  const {
    children,
    onPress,
    height = 55,
    width,
    variant = 'primary',
    borderRadius = 12,
    stackProps,
    fontSize = height / 3,
    borderWidth = 1.5,
    mode = 'filled',
    elevation = mode === 'filled' ? 5 : 0,
    loading,
    disabled = loading,
    typographyVariant = mode === 'filled'
      ? 'white'
      : disabled
      ? 'disabled'
      : 'primary',
    typographyProps,
    borderColor,
  } = props;
  const backgroundColor =
    theme.colors[
      mode === 'outlined' ? 'surface' : disabled ? 'disabled' : variant
    ];
  const typographyColor = theme.colors[typographyVariant];

  return (
    <Touch onPress={onPress} disabled={disabled}>
      <Stack
        height={height}
        width={width}
        backgroundColor={backgroundColor}
        justifyContent={typeof children === 'string' ? 'center' : undefined}
        alignItems={typeof children === 'string' ? 'center' : undefined}
        borderRadius={borderRadius}
        elevation={elevation}
        borderWidth={borderWidth}
        borderColor={
          borderColor ?? (mode === 'filled' ? backgroundColor : typographyColor)
        }
        {...stackProps}>
        {loading ? (
          <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
            <ActivityIndicator color={typographyColor} />
          </Stack>
        ) : typeof children === 'string' ? (
          <Typography
            fontSize={fontSize}
            color={typographyColor}
            {...typographyProps}>
            {children}
          </Typography>
        ) : (
          children
        )}
      </Stack>
    </Touch>
  );
}

export default Button;
