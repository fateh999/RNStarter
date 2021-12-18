import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';

interface BodyProps extends KeyboardAwareScrollViewProps {
  backgroundColor?: string;
  children?: any;
  variant?: VARIANT;
}

function Body(props: BodyProps) {
  const {style, backgroundColor, variant = 'transparent'} = props;
  const theme = useThemeValue();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flexGrow: 1,
          backgroundColor: backgroundColor
            ? backgroundColor
            : variant ?? theme.colors[variant],
        },
      }),
    [backgroundColor, theme.colors, variant],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps={'handled'}
      enableOnAndroid={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

export default Body;
