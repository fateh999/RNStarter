import {AppState} from 'react-native';
import {focusManager, QueryClient, onlineManager} from 'react-query';
import NetInfo from '@react-native-community/netinfo';
import {createNativePersistor} from 'react-query-native-persist';
import MMKVStorageAdapter from 'react-query-native-persist/dist/adapters/mmkv-storage';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import FastStorage from 'src/Utils/FastStorage';
import {onError} from './Helpers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError,
      onSuccess: console.log,
      cacheTime: Infinity,
    },
    mutations: {
      onError,
      onSuccess: console.log,
    },
  },
});

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(state.isConnected ? true : false);
  });
});

const persistor = createNativePersistor({
  key: 'MY_APP_PERSISTENCE_KEY',
  adapter: new MMKVStorageAdapter(FastStorage.MMKV),
});

persistQueryClient({
  queryClient,
  persistor,
});

focusManager.setEventListener((handleFocus: any) => {
  const listener = AppState.addEventListener('change', handleFocus);
  return () => {
    listener.remove();
  };
});
