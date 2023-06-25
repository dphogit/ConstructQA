import { Anchor, Box, Container, Text } from '@mantine/core';
import { QuestionInput } from './QuestionInput';

const BUILDING_CODES_COMPLIANCE_HREF =
  'https://www.building.govt.nz/building-code-compliance/';

function Disclaimer() {
  return (
    <Text align="center" mt="xs" fz="xs" color="dimmed">
      ConstructQA is a research project designed to answer questions about the{' '}
      <Anchor
        href={BUILDING_CODES_COMPLIANCE_HREF}
        target="_blank"
        rel="norefferer"
      >
        NZ building compliance codes
      </Anchor>
      . Use at your own discretion.
    </Text>
  );
}

export function FloatingBottomInteractiveArea() {
  return (
    <Box pos="absolute" w="100%" bottom={0} pb={32}>
      <Container>
        <QuestionInput />
        <Disclaimer />
      </Container>
    </Box>
  );
}
