import React from 'react';
import {ImageResizeMode, ImageSourcePropType} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import Picture from '../Picture/Picture';
import Touch, {TouchProps} from '../Touch/Touch';

type IconButtonProps = {
  type?: 'MaterialCommunityIcons' | 'Image';
  iconVariant?: VARIANT;
  dark?: boolean;
  name?: string;
  source?: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
};

function IconButton(
  props: IconButtonProps & Omit<IconProps, 'onPress' | 'name'> & TouchProps,
) {
  const theme = useThemeValue();
  const {
    type = 'MaterialCommunityIcons',
    color,
    dark = theme.type === 'dark',
    iconVariant = dark ? 'white' : 'black',
    size = 24,
    borderRadius = (size * 1.5) / 2,
    name,
    source,
    resizeMode = 'contain',
    variant = 'transparent',
    ...touchProps
  } = props;

  switch (type) {
    case 'MaterialCommunityIcons': {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={borderRadius}
          variant={variant}
          {...touchProps}>
          {name && (
            <MaterialCommunityIcons
              name={name}
              size={size}
              color={color ? color : theme.colors[iconVariant]}
            />
          )}
        </Touch>
      );
    }

    case 'Image': {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={borderRadius}
          variant={variant}
          android_ripple={null}
          {...touchProps}>
          {source && (
            <Picture
              source={source}
              height={size * 1.5}
              width={size * 1.5}
              borderRadius={borderRadius}
              padding={size * 1.5 - size}
              resizeMode={resizeMode}
            />
          )}
        </Touch>
      );
    }

    default: {
      return (
        <Touch
          justifyContent={'center'}
          alignItems={'center'}
          height={size * 1.5}
          width={size * 1.5}
          borderRadius={(size * 1.5) / 2}
          variant={variant}
          {...touchProps}>
          {name && (
            <MaterialCommunityIcons
              name={name}
              size={size}
              color={color ? color : theme.colors[iconVariant]}
            />
          )}
        </Touch>
      );
    }
  }
}

export default IconButton;
