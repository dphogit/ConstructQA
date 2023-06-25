import { Anchor, Box, Container, Text } from '@mantine/core';
import { QuestionInput } from './QuestionInput';
import { SIDEBAR_WIDTH } from '@/components/AppLayout';

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
    <Box
      pos="fixed"
      w={`calc(100% - ${SIDEBAR_WIDTH}px)`}
      bottom={0}
      pt={32}
      pb={32}
      bg="linear-gradient(180deg, hsla(0,0%,100%,0), #fff 50%)"
    >
      <Container>
        <QuestionInput />
        <Disclaimer />
      </Container>
    </Box>
  );
}
