import React from 'react';
import Stack from 'src/Components/Stack';
import Touch from 'src/Components/Touch';

function App() {
  return (
    <Stack flex={1} paddingVertical={'xxl'} paddingHorizontal={'xxl'}>
      <Touch onPress={() => {}}>
        <Stack
          height={50}
          backgroundColor={'red'}
          borderRadius={16}
          elevation={5}
        />
      </Touch>
    </Stack>
  );
}

export default App;
