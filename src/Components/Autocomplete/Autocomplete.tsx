import React from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useForm,
} from 'react-hook-form';
import {Modal, FlatList, Pressable} from 'react-native';
import Block from 'src/Components/Block/Block';
import Container from 'src/Components/Container/Container';
import IconButton from 'src/Components/IconButton/IconButton';
import Typography from 'src/Components/Typography/Typography';
import {SELECT_OPTIONS} from 'src/Utils/Types';
import InputText from '../InputText/InputText';

type AutocompleteProps = {
  visible: boolean;
  options: SELECT_OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
  setVisible: (visible: boolean) => void;
  label?: string;
  placeholder?: string;
};

function Autocomplete(props: AutocompleteProps) {
  const {visible, options, field, setVisible, label, placeholder} = props;
  const {control, watch} = useForm({
    defaultValues: {
      search: '',
    },
  });
  const controller = useController({control, name: 'search'});

  return (
    <Modal visible={visible} animationType={'slide'}>
      <Container>
        <Block>
          <Block flexDirection={'row'} padding={10}>
            <Block flex={1} />
            <Block justifyContent={'center'} flex={10}>
              <Typography fontSize={22} textAlign={'center'}>
                {placeholder ?? label}
              </Typography>
            </Block>
            <Block flex={1} alignItems={'center'}>
              <IconButton
                name={'close'}
                iconVariant={'onSurface'}
                onPress={() => {
                  setVisible(false);
                }}
              />
            </Block>
          </Block>
          <Block padding={10}>
            <InputText
              field={controller.field}
              formState={controller.formState}
              textInputProps={{
                placeholder: 'Search',
              }}
            />
          </Block>
        </Block>
        <FlatList
          data={options.filter(
            option =>
              option.label
                .toLowerCase()
                .indexOf(watch('search').toLowerCase()) !== -1,
          )}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                field.onChange(`${item.value}`);
                setTimeout(() => {
                  setVisible(false);
                }, 100);
              }}>
              <Block
                alignItems={'center'}
                paddingHorizontal={20}
                flexDirection={'row'}
                height={50}>
                <Typography
                  variant={
                    `${item.value}` === `${field.value}` ? 'primary' : 'text'
                  }>
                  {item.label}
                </Typography>
              </Block>
            </Pressable>
          )}
          keyExtractor={item => `${item.value}`}
          ItemSeparatorComponent={() => (
            <Block height={1} variant={'divider'} />
          )}
          ListFooterComponent={() => <Block height={1} variant={'divider'} />}
        />
      </Container>
    </Modal>
  );
}

export default Autocomplete;
