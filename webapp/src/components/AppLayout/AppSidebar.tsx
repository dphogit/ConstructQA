import { Flex, Navbar, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';

export const SIDEBAR_WIDTH = 260;

export function AppSidebar() {
  return (
    <Navbar p="xl" width={{ base: SIDEBAR_WIDTH }}>
      <Flex
        direction="column"
        justify="space-between"
        h="100%"
        align="flex-start"
      >
        <Title order={1} size="h2">
          👷‍♂️ ConstructQA
        </Title>
        <HealthCheck />
      </Flex>
    </Navbar>
  );
}
