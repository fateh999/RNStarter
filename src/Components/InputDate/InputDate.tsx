import React, {Fragment, useMemo, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Typography from 'src/Components/Typography/Typography';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import moment from 'moment';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Block from 'src/Components/Block/Block';

type InputDateProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  datePickerProps?: Omit<
    ReactNativeModalDateTimePickerProps,
    'onConfirm' | 'onCancel'
  >;
};

function InputDate(props: InputDateProps) {
  const {
    formState,
    field,
    textInputProps,
    label,
    left,
    right,
    datePickerProps,
  } = props;
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

      <Pressable
        onPress={() => {
          setDatePickerVisibility(true);
          setFocus(true);
        }}>
        <View pointerEvents={'none'}>
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
                value={field.value ? moment(field.value).format('LL') : ''}
                onFocus={() => {
                  Keyboard.dismiss();
                  setDatePickerVisibility(true);
                  setFocus(true);
                }}
                placeholderTextColor={theme.colors.placeholder}
                style={[styles.textInputStyle, textInputProps?.style]}
              />
            </Block>
            {right}
          </Block>
        </View>
      </Pressable>

      {errorMessage && (
        <Typography fontSize={12} color={borderColor}>
          {errorMessage}
        </Typography>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={field.value ? new Date(field.value) : undefined}
        onConfirm={date => {
          setDatePickerVisibility(false);
          field.onChange(date);
          setFocus(false);
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
          setFocus(false);
        }}
        {...datePickerProps}
      />
    </Fragment>
  );
}

export default InputDate;
