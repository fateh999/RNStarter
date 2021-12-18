import {useCallback, useRef, useState} from 'react';

import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import SnackbarHandler from 'src/Utils/SnackbarHandler';

function useBackHandler(cb?: () => boolean | null) {
  const [count, setCount] = useState(0);
  const cbRef = useRef<any>(cb);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = cbRef.current
        ? cbRef.current
        : () => {
            setTimeout(() => {
              setCount(0);
            }, 3000);
            if (count === 1) {
              BackHandler.exitApp();
            } else {
              SnackbarHandler.normalToast('Press again to exit.');
            }
            setCount(count + 1);
            return true;
          };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [count]),
  );
}

export default useBackHandler;
