import React from 'react';
import {MaterialIndicator} from 'react-native-indicators';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Block from '../Block/Block';
import Touch, {TouchProps} from '../Touch/Touch';
import Typography, {TypographyProps} from '../Typography/Typography';

type ButtonProps = {
  children: any;
  height?: number;
  labelProps?: TypographyProps;
  rounded?: boolean;
  loading?: boolean;
  left?: any;
  right?: any;
  type?: 'outlined' | 'filled' | 'text';
};

function Button(props: ButtonProps & TouchProps) {
  const {
    children,
    height = 50,
    borderWidth = 2,
    variant = 'primary',
    labelProps,
    rounded,
    left,
    right,
    loading,
    disabled,
    borderRadius = height / 10,
    type = 'filled',
    elevation = type === 'text' ? 0 : 5,
    borderColor,
    ...touchProps
  } = props;
  const buttonHeight = height - 2 * borderWidth;
  const fontSize = height / 3;
  const theme = useThemeValue();

  return (
    <Touch
      height={buttonHeight}
      variant={
        type === 'text' ? 'transparent' : disabled ? 'disabled' : variant
      }
      borderRadius={rounded ? height / 2 : borderRadius}
      borderWidth={borderWidth}
      borderColor={
        type === 'text'
          ? 'transparent'
          : disabled
          ? theme.colors.disabled
          : borderColor
          ? borderColor
          : variant
          ? theme.colors[variant]
          : touchProps.backgroundColor
      }
      disabled={disabled}
      elevation={elevation}
      {...touchProps}>
      <Block
        flexDirection={'row'}
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}>
        {left}
        <Block flex={0} flexDirection={'row'}>
          <Typography
            numberOfLines={1}
            fontSize={fontSize}
            variant={type === 'text' ? variant : 'white'}
            {...labelProps}>
            {children}
          </Typography>
          {loading && (
            <Block marginHorizontal={fontSize}>
              <MaterialIndicator
                size={fontSize}
                color={theme.colors[labelProps?.variant ?? 'white']}
              />
            </Block>
          )}
        </Block>
        {right}
      </Block>
    </Touch>
  );
}

export default Button;
