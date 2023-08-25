import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import MainStackNavigator from 'src/Navigation/StackNavigators/MainStackNavigator';
import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import FastStorage from 'src/Utils/FastStorage';
import {onError} from 'src/Utils/Helpers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      onError,
    },
    mutations: {
      onError,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: FastStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <NavigationContainer onReady={RNBootSplash.hide}>
        <MainStackNavigator />
      </NavigationContainer>
    </PersistQueryClientProvider>
  );
}

export default App;
