import { Anchor, Text } from '@mantine/core';

const BUILDING_CODES_COMPLIANCE_HREF =
  'https://www.building.govt.nz/building-code-compliance/';

export function Disclaimer() {
  return (
    <Text align="center" mt="xs" fz="xs" color="dimmed">
      ConstructQA is a research project designed to answer questions about the{' '}
      <Anchor
        href={BUILDING_CODES_COMPLIANCE_HREF}
        target="_blank"
        rel="norefferer"
      >
        NZ building compliance codes
      </Anchor>{' '}
      and their accompanying Acceptable Solutions and Verifciation Methods
      documents. Use at your own discretion.
    </Text>
  );
}
