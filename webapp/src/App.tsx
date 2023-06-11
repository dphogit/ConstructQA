import { MantineProvider, Title } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Title order={1}>Hello ConstructQA 👷‍♂️!</Title>
    </MantineProvider>
  );
}

export default App;
