import React, {useMemo, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native';
import Block from 'src/Components/Block/Block';
import Typography from 'src/Components/Typography/Typography';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import scaler from 'src/Utils/scaler';
import InputLabel from '../InputLabel/InputLabel';

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
    : theme.colors.primary;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const borderWidth = focus || errorMessage ? scaler(2) : scaler(1);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          fontSize: scaler(15),
          paddingHorizontal: scaler(15),
          paddingBottom: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          paddingVertical: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          color: textColor,
          textAlignVertical: 'center',
          ...theme.fonts.medium,
        },
      }),
    [textColor, theme.fonts.medium],
  );

  return (
    <Block>
      <InputLabel
        label={label}
        focus={focus || errorMessage || field.value}
        labelColor={labelColor}
      />
      <Block
        flexDirection={'row'}
        borderWidth={borderWidth}
        borderColor={borderColor}
        borderRadius={scaler(12)}
        minHeight={scaler(56)}
        variant={'surface'}
        overflow="hidden">
        {left}
        <Block paddingVertical={scaler(8)} flex={1} justifyContent={'center'}>
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
        <Typography
          marginTop={scaler(5)}
          marginHorizontal={scaler(15)}
          fontSize={scaler(12)}
          color={borderColor}>
          {errorMessage}
        </Typography>
      )}
    </Block>
  );
}

export default InputText;
