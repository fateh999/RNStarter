import React, {Fragment} from 'react';
import {useCallback} from 'react';
import {Control} from 'react-hook-form';
import Block from '../Block/Block';
import FormInput, {FormInputProps} from '../FormInput/FormInput';

type FormBuilderProps = {
  formConfigArray: Array<FormInputProps | Array<FormInputProps>>;
  control: Control<any>;
  setFocus?: (name: any) => void;
};

function FormBuilder(props: FormBuilderProps) {
  const {formConfigArray, control, setFocus} = props;

  const onNextInput = useCallback(
    (index: number, configArray: any) => {
      if (configArray[index + 1]) {
        if (
          setFocus &&
          configArray[index + 1].type !== 'custom' &&
          configArray[index + 1].type !== 'select' &&
          configArray[index + 1].type !== 'autocomplete' &&
          configArray[index + 1].type !== 'date'
        ) {
          if (setFocus) {
            setFocus(configArray[index + 1].name);
          }
        }
      }
    },
    [setFocus],
  );

  return (
    <Fragment>
      {formConfigArray.map((item, index) =>
        Array.isArray(item) ? (
          <Fragment key={index}>
            <Block flexDirection={'row'}>
              {item.map((innerItem, innerIndex) => (
                <Fragment key={innerItem.name}>
                  <Block flex={1}>
                    <FormInput
                      {...innerItem}
                      control={control}
                      textInputProps={{
                        ...innerItem.textInputProps,
                        onSubmitEditing:
                          innerItem.textInputProps?.onSubmitEditing ??
                          (() => {
                            onNextInput(
                              innerIndex === item.length - 1
                                ? index
                                : innerIndex,
                              innerIndex === item.length - 1
                                ? formConfigArray
                                : item,
                            );
                          }),
                        returnKeyType:
                          index !== formConfigArray.length - 1
                            ? 'next'
                            : 'done',
                      }}
                    />
                  </Block>
                  {innerIndex !== item.length - 1 && <Block width={15} />}
                </Fragment>
              ))}
            </Block>
            {index !== formConfigArray.length - 1 && <Block height={15} />}
          </Fragment>
        ) : (
          <Fragment key={item.name}>
            <FormInput
              {...item}
              control={control}
              textInputProps={{
                ...item.textInputProps,
                onSubmitEditing:
                  item.textInputProps?.onSubmitEditing ??
                  (() => {
                    onNextInput(
                      Array.isArray(formConfigArray[index + 1]) ? -1 : index,
                      Array.isArray(formConfigArray[index + 1])
                        ? formConfigArray[index + 1]
                        : formConfigArray,
                    );
                  }),
                returnKeyType:
                  index !== formConfigArray.length - 1 ? 'next' : 'done',
              }}
            />
            {index !== formConfigArray.length - 1 && <Block height={15} />}
          </Fragment>
        ),
      )}
    </Fragment>
  );
}

export default FormBuilder;
