import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  Keyboard,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Typography from 'src/Components/Typography/Typography';
import Menu, {MenuDivider, MenuItem} from 'react-native-material-menu';
import {SELECT_OPTIONS} from 'src/Utils/Types';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import Block from 'src/Components/Block/Block';

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
    : theme.colors.placeholder;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const borderWidth = focus || errorMessage ? 2 : 1;
  const menuRef = useRef<any>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
        menuStyle: {
          minWidth: width,
          width: width,
          backgroundColor: theme.colors.surface,
          borderRadius: 0,
          marginTop: height,
          shadowOpacity: 0.0015 * 10 + 0.18,
          shadowRadius: 0.54 * 10,
          shadowOffset: {
            height: 0.6 * 10,
            width: 0.6 * 10,
          },
          shadowColor: theme.colors.onSurface,
          elevation: 5,
        },
      }),
    [height, textColor, theme.colors.onSurface, theme.colors.surface, width],
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width: _width, height: _height} = event.nativeEvent.layout;
    setWidth(_width);
    setHeight(_height);
  }, []);

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

      <Menu
        ref={menuRef}
        style={styles.menuStyle}
        onHidden={() => {
          setFocus(false);
        }}
        button={
          <Pressable
            onPress={() => {
              menuRef.current?.show();
              setFocus(true);
            }}>
            <View pointerEvents={'none'} onLayout={onLayout}>
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
                    onFocus={() => {
                      Keyboard.dismiss();
                      setFocus(true);
                      menuRef.current?.show();
                    }}
                    placeholderTextColor={theme.colors.placeholder}
                    style={[styles.textInputStyle, textInputProps?.style]}
                  />
                </Block>
                {right}
              </Block>
            </View>
          </Pressable>
        }>
        {options.map(({label: _label, value: _value}, _index) => {
          return (
            <Fragment key={_value}>
              <MenuItem
                style={{width, minWidth: width, maxWidth: width}}
                onPress={() => {
                  field.onChange(`${_value}`);
                  menuRef.current?.hide();
                }}
                textStyle={{
                  color:
                    `${_value}` === `${field.value}`
                      ? theme.colors.primary
                      : theme.colors.text,
                }}>
                {_label}
              </MenuItem>
              {_index < options.length - 1 && (
                <MenuDivider color={theme.colors.divider} />
              )}
            </Fragment>
          );
        })}
      </Menu>
      {errorMessage && (
        <Typography fontSize={12} color={borderColor}>
          {errorMessage}
        </Typography>
      )}
    </Fragment>
  );
}

export default InputSelect;
