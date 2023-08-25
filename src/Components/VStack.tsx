import React, {forwardRef, memo} from 'react';
import Stack, {StackProps} from './Stack';

function VStack(props: StackProps) {
  const {flexDirection = 'column'} = props;

  return <Stack flexDirection={flexDirection} {...props} />;
}

export default memo(forwardRef(VStack));
