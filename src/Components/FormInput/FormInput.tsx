import React, {Fragment} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import {TextInputProps, View} from 'react-native';
import {ReactNativeModalDateTimePickerProps} from 'react-native-modal-datetime-picker';
import InputAutocomplete from 'src/Components/InputAutocomplete/InputAutocomplete';
import InputDate from 'src/Components/InputDate/InputDate';
import InputSelect from 'src/Components/InputSelect/InputSelect';
import InputText from 'src/Components/InputText/InputText';
import {INPUT_TYPES, SELECT_OPTIONS} from 'src/Utils/Types';
import Block from '../Block/Block';
import CallingCode from '../CallingCode/CallingCode';
import IconButton from '../IconButton/IconButton';

export type FormInputProps = {
  name: string;
  callingCodeName?: string;
  onCallingCodeChanged?: () => void;
  label?: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  shouldUnregister?: boolean;
  defaultValue?: unknown;
  control?: Control<any>;
  setFocus?: (name: any) => void;
  type: INPUT_TYPES;
  textInputProps?: TextInputProps;
  left?: any;
  right?: any;
  options?: SELECT_OPTIONS;
  JSX?: (_props: Omit<FormInputProps, 'JSX'>) => any;
  datePickerProps?: Omit<
    ReactNativeModalDateTimePickerProps,
    'onConfirm' | 'onCancel'
  >;
};

function FormInput(props: FormInputProps) {
  const {
    name,
    callingCodeName,
    onCallingCodeChanged,
    label,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    type,
    textInputProps,
    left,
    right,
    options,
    JSX,
    datePickerProps,
  } = props;
  const {field, formState} = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  switch (type) {
    case 'text': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
        />
      );
    }
    case 'phone': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            keyboardType: 'number-pad',
            ...textInputProps,
          }}
          left={
            left ??
            (callingCodeName ? (
              <Block justifyContent={'center'}>
                <CallingCode
                  name={callingCodeName}
                  control={control}
                  callback={onCallingCodeChanged}
                />
              </Block>
            ) : (
              <Fragment />
            ))
          }
          right={right}
        />
      );
    }
    case 'email': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            ...textInputProps,
          }}
          left={left}
          right={right}
        />
      );
    }
    case 'password': {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            secureTextEntry: true,
            ...textInputProps,
          }}
          left={left}
          right={right}
        />
      );
    }
    case 'select': {
      return (
        <Fragment>
          {options && (
            <InputSelect
              label={label}
              field={field}
              formState={formState}
              textInputProps={textInputProps}
              left={left}
              right={
                right ?? (
                  <Block justifyContent={'center'}>
                    <View pointerEvents={'none'}>
                      <IconButton name={'menu-down'} iconVariant={'text'} />
                    </View>
                  </Block>
                )
              }
              options={options}
            />
          )}
        </Fragment>
      );
    }
    case 'autocomplete': {
      return (
        <Fragment>
          {options && (
            <InputAutocomplete
              label={label}
              field={field}
              formState={formState}
              textInputProps={textInputProps}
              left={left}
              right={
                right ?? (
                  <Block justifyContent={'center'}>
                    <View pointerEvents={'none'}>
                      <IconButton name={'menu-down'} iconVariant={'text'} />
                    </View>
                  </Block>
                )
              }
              options={options}
            />
          )}
        </Fragment>
      );
    }
    case 'date': {
      return (
        <InputDate
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          right={right}
          left={
            left ?? (
              <Block justifyContent={'center'}>
                <View pointerEvents={'none'}>
                  <IconButton name={'calendar'} iconVariant={'text'} />
                </View>
              </Block>
            )
          }
          datePickerProps={datePickerProps}
        />
      );
    }
    case 'custom': {
      return JSX && JSX(props);
    }
  }
}

export default FormInput;
