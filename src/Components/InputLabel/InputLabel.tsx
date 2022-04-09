import {MotiView} from 'moti';
import React, {Fragment} from 'react';
import scaler from 'src/Utils/scaler';
import Block from '../Block/Block';
import Typography from '../Typography/Typography';

function InputLabel(props: {
  label?: string;
  focus: boolean;
  labelColor: string;
}) {
  const {label, focus, labelColor} = props;

  return (
    <Fragment>
      {label && (
        <MotiView
          animate={{
            opacity: focus ? 1 : 0,
            zIndex: 1,
          }}>
          <Typography
            marginHorizontal={scaler(15)}
            type={'medium'}
            fontSize={scaler(15)}
            color={labelColor}
            backgroundColor={'white'}
            paddingHorizontal={scaler(5)}
            position="absolute">
            {label}
          </Typography>
          <Block height={scaler(8)} />
        </MotiView>
      )}
    </Fragment>
  );
}

export default InputLabel;
