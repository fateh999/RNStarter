import React, {Fragment, useMemo, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Block from 'src/Components/Block/Block';
import Typography from 'src/Components/Typography/Typography';
import {SELECT_OPTIONS} from 'src/Utils/Types';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Autocomplete from '../Autocomplete/Autocomplete';

type InputAutocompleteProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options: SELECT_OPTIONS;
};

function InputAutocomplete(props: InputAutocompleteProps) {
  const {formState, field, textInputProps, label, left, right, options} = props;
  const theme = useThemeValue();
  const errorMessage = formState.errors?.[field.name]?.message;
  const borderColor = errorMessage
    ? theme.colors.error
    : theme.colors.placeholder;
  const labelColor = errorMessage
    ? theme.colors.error
    : theme.colors.placeholder;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const borderWidth = errorMessage ? 2 : 1;
  const [visible, setVisible] = useState(false);

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
          setVisible(true);
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
                ref={field.ref}
                {...textInputProps}
                value={
                  options.find(({value}) => `${value}` === `${field.value}`)
                    ?.label
                }
                placeholderTextColor={theme.colors.placeholder}
                style={[styles.textInputStyle, textInputProps?.style]}
              />
            </Block>
            {right}
          </Block>
        </View>
      </Pressable>
      <Autocomplete
        visible={visible}
        setVisible={setVisible}
        options={options}
        label={label}
        placeholder={textInputProps?.placeholder}
        field={field}
      />
      {errorMessage && (
        <Typography fontSize={12} color={borderColor}>
          {errorMessage}
        </Typography>
      )}
    </Fragment>
  );
}

export default InputAutocomplete;
