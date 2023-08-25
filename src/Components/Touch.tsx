import React, {forwardRef, useMemo} from 'react';
import {MotiPressable, MotiPressableProps} from 'moti/interactions';
import {View} from 'react-native/types';

function Touch(props: MotiPressableProps, ref: React.Ref<View>) {
  return (
    <MotiPressable
      ref={ref}
      {...props}
      animate={useMemo(
        () =>
          ({hovered, pressed}) => {
            'worklet';
            return {
              scale: hovered || pressed ? 0.98 : 1,
            };
          },
        [],
      )}
    />
  );
}

export default forwardRef(Touch);
