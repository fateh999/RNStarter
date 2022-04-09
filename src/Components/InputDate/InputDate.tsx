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
import scaler from 'src/Utils/scaler';
import InputLabel from '../InputLabel/InputLabel';

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
    : theme.colors.primary;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const borderWidth = focus || errorMessage ? scaler(2) : scaler(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
    <Fragment>
      <InputLabel
        label={label}
        focus={focus || errorMessage || field.value}
        labelColor={labelColor}
      />

      <Pressable
        onPress={() => {
          setDatePickerVisibility(true);
          setFocus(true);
        }}>
        <View pointerEvents={'none'}>
          <Block
            flexDirection={'row'}
            variant={'surface'}
            borderWidth={borderWidth}
            borderColor={borderColor}
            height={scaler(56)}
            borderRadius={scaler(12)}
            overflow="hidden">
            {left}
            <Block
              paddingVertical={scaler(8)}
              flex={1}
              justifyContent={'center'}>
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
        <Typography
          fontSize={scaler(12)}
          marginHorizontal={scaler(30)}
          color={borderColor}>
          {errorMessage}
        </Typography>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={field.value ? new Date(field.value) : undefined}
        onConfirm={date => {
          setDatePickerVisibility(false);
          if (datePickerProps?.maximumDate) {
            if (datePickerProps.maximumDate.getTime() < date.getTime()) {
              field.onChange(datePickerProps.maximumDate.toISOString());
            } else {
              field.onChange(date.toISOString());
            }
          } else {
            field.onChange(date.toISOString());
          }
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
