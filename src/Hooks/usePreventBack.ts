import {useNavigation} from '@react-navigation/core';
import {useEffect, useRef} from 'react';

function usePreventBack(prevent: boolean, cb?: () => void) {
  const navigation = useNavigation();
  const cbRef = useRef<any>(cb);

  useEffect(() => {
    return navigation.addListener('beforeRemove', e => {
      if (!prevent) {
        return;
      }
      e.preventDefault();
      if (cbRef.current) {
        cbRef.current();
      }
    });
  }, [navigation, prevent]);

  return {};
}

export default usePreventBack;
