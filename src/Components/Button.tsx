import React from 'react';
import Stack from './Stack';
import Touch from './Touch';
import Typography from './Typography';

type ButtonProps = {
  children: string | JSX.Element;
  onPress?: () => void;
};

function Button(props: ButtonProps) {
  const {children, onPress} = props;

  return (
    <Touch onPress={onPress}>
      <Stack
        height={50}
        backgroundColor={'red'}
        justifyContent={typeof children === 'string' ? 'center' : undefined}
        alignItems={typeof children === 'string' ? 'center' : undefined}
        borderRadius={16}
        elevation={5}>
        {typeof children === 'string' ? (
          <Typography>{children}</Typography>
        ) : (
          children
        )}
      </Stack>
    </Touch>
  );
}

export default Button;
