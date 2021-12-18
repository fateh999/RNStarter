import React, {Fragment, useMemo, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native';
import Block from 'src/Components/Block/Block';
import Typography from 'src/Components/Typography/Typography';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';

type InputTextProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
};

function InputText(props: InputTextProps) {
  const {formState, field, textInputProps, label, left, right} = props;
  const theme = useThemeValue();
  const errorMessage = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const borderColor = errorMessage
    ? theme.colors.error
    : focus
    ? theme.colors.primary
    : theme.colors.placeholder;
  const labelColor = errorMessage
    ? theme.colors.error
    : focus
    ? theme.colors.primary
    : theme.colors.placeholder;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const borderWidth = focus || errorMessage ? 2 : 1;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingBottom: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          paddingVertical: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          color: textColor,
          textAlignVertical: 'center',
        },
      }),
    [textColor],
  );

  return (
    <Fragment>
      {label && (
        <Fragment>
          <Typography type={'medium'} fontSize={16} color={labelColor}>
            {label}
          </Typography>
          <Block height={8} />
        </Fragment>
      )}
      <Block
        flexDirection={'row'}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={2}
        overflow="hidden">
        {left}
        <Block paddingVertical={8} flex={1} justifyContent={'center'}>
          <TextInput
            {...textInputProps}
            ref={field.ref}
            value={field.value}
            onChangeText={text => field.onChange(text)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholderTextColor={theme.colors.placeholder}
            style={[styles.textInputStyle, textInputProps?.style]}
          />
        </Block>
        {right}
      </Block>
      {errorMessage && (
        <Typography fontSize={12} color={borderColor}>
          {errorMessage}
        </Typography>
      )}
    </Fragment>
  );
}

export default InputText;
