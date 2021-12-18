import {useCallback} from 'react';
import {Alert} from 'react-native';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import {resetAuthValue} from './useAuthValue';

function useLogout() {
  const logout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          queryClient.clear();
          resetAuthValue();
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  }, []);

  return {
    logout,
  };
}

export default useLogout;
