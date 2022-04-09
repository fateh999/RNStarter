/* eslint-disable react-native/no-inline-styles */
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
import {SELECT_OPTIONS} from 'src/Utils/Types';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Block from 'src/Components/Block/Block';
import Touch from '../Touch/Touch';
import ReactNativeModal from 'react-native-modal';
import SafeAreaBlock from '../SafeAreaBlock/SafeAreaBlock';
import Body from '../Body/Body';
import IconButton from '../IconButton/IconButton';
import scaler from 'src/Utils/scaler';
import InputLabel from '../InputLabel/InputLabel';

type InputSelectProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options: SELECT_OPTIONS;
};

function InputSelect(props: InputSelectProps) {
  const {formState, field, textInputProps, label, left, right, options} = props;
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
  const [visible, setVisible] = useState(false);

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
      {label && (
        <InputLabel
          label={label}
          focus={focus || errorMessage || field.value}
          labelColor={labelColor}
        />
      )}

      <Pressable
        onPress={() => {
          setVisible(true);
          setFocus(true);
        }}>
        <View pointerEvents={'none'}>
          <Block
            flexDirection={'row'}
            borderWidth={borderWidth}
            borderColor={borderColor}
            borderRadius={scaler(12)}
            height={scaler(56)}
            variant={'surface'}
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
                onFocus={() => {
                  Keyboard.dismiss();
                  setFocus(true);
                  // menuRef.current?.show();
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

      <ReactNativeModal
        isVisible={visible}
        onBackButtonPress={() => {
          setVisible(false);
        }}
        onBackdropPress={() => {
          setVisible(false);
        }}
        onModalShow={() => {
          setFocus(true);
        }}
        onModalHide={() => {
          setFocus(false);
        }}
        animationInTiming={500}
        animationOutTiming={1000}
        style={{margin: 0, justifyContent: 'flex-end'}}
        useNativeDriver
        hardwareAccelerated
        useNativeDriverForBackdrop>
        <SafeAreaBlock variant="surface" flex={1} maxHeight={scaler(250)}>
          <Block flex={1} maxHeight={scaler(250)} variant={'surface'}>
            <Typography fontSize={scaler(20)} margin={scaler(20)}>
              Select {label}
            </Typography>
            <Body style={{height: scaler(250)}}>
              {options.map(({label: _label, value: _value}, _index) => {
                return (
                  <Fragment key={_value}>
                    <Touch
                      height={scaler(50)}
                      onPress={() => {
                        field.onChange(_value);
                        setVisible(false);
                      }}>
                      <Block
                        height={scaler(50)}
                        paddingHorizontal={scaler(20)}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Typography
                          fontSize={scaler(15)}
                          variant={_value === field.value ? 'primary' : 'text'}>
                          {_label}
                        </Typography>
                        {_value === field.value && (
                          <IconButton name="check" iconVariant={'primary'} />
                        )}
                      </Block>
                    </Touch>
                  </Fragment>
                );
              })}
            </Body>
          </Block>
        </SafeAreaBlock>
      </ReactNativeModal>
    </Fragment>
  );
}

export default InputSelect;
