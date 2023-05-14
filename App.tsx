import React from 'react';
import Stack from 'src/Components/Stack';
import Touch from 'src/Components/Touch';

function App() {
  return (
    <Stack flex={1} paddingVertical={40} paddingHorizontal={20}>
      <Touch onPress={() => {}}>
        <Stack height={50} backgroundColor={'red'}></Stack>
      </Touch>
    </Stack>
  );
}

export default App;
