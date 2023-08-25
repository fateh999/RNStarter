import React, {forwardRef, memo} from 'react';
import Stack, {StackProps} from './Stack';

function HStack(props: StackProps) {
  const {flexDirection = 'row'} = props;

  return <Stack flexDirection={flexDirection} {...props} />;
}

export default memo(forwardRef(HStack));
