import Router from './Navigation/Router';
import React from 'react';
import {QueryClientProvider} from 'react-query';
//@ts-ignore
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {queryClient} from './Utils/ReactQueryConfig';

function App() {
  return (
    <InternetConnectionAlert>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </InternetConnectionAlert>
  );
}

export default App;
